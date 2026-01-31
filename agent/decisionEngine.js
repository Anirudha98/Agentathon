import { getMCPContext } from "../mcp/index.js";

/**
 * Hugging Face Router (OpenAI-compatible)
 */
const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";

const HF_HEADERS = {
  Authorization: `Bearer ${process.env.HF_TOKEN}`,
  "Content-Type": "application/json"
};

/**
 * System prompt that defines SpendGuard's intelligence
 */
const SYSTEM_PROMPT = `
You are SpendGuard AI, a real-time financial copilot.

You must decide what to do BEFORE a payment is completed.

Possible decisions:
- approve
- suggest_alternative
- friction
- block

Guidelines:
- Healthcare or safety-related transactions must always be approved instantly.
- If the user is close to a budget limit, prefer suggesting alternatives instead of blocking.
- Late-night e-commerce transactions usually indicate impulse buying → apply friction.
- If the user frequently overrides a restriction, treat it as a learned preference.

Return ONLY valid JSON in this exact format:

{
  "decision": "approve | suggest_alternative | friction | block",
  "message": "Short, empathetic explanation to the user",
  "options": ["Option 1", "Option 2", "Option 3"]
}
`;

/**
 * Calls Hugging Face Chat Completions API
 */
async function callLLM(messages) {
  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: HF_HEADERS,
    body: JSON.stringify({
      model: "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
      messages,
      temperature: 0.2,
      max_tokens: 300
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HF API Error: ${errorText}`);
  }

  const result = await response.json();
  return result.choices[0].message.content;
}

/**
 * Main decision engine
 */
export async function getDecision(transactionId) {
  // 1. Get MCP context
  const context = await getMCPContext(transactionId);

  // 2. Build chat messages
  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT
    },
    {
      role: "user",
      content: `Context:\n${JSON.stringify(context, null, 2)}`
    }
  ];

  // 3. Call the LLM
  const rawOutput = await callLLM(messages);

  // 4. Parse and validate JSON
  try {
    return JSON.parse(rawOutput);
  } catch (error) {
    console.error("❌ Invalid JSON from AI:", rawOutput);
    throw new Error("AI returned malformed JSON");
  }
}
