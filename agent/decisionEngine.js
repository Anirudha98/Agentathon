import { getMCPContext } from "../mcp/index.js";
import { recordOverride } from "../mcp/behaviorPatterns.js";

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";
const HF_HEADERS = {
  Authorization: `Bearer ${process.env.HF_TOKEN}`,
  "Content-Type": "application/json"
};

const SYSTEM_PROMPT = `
You are SpendGuard AI, a real-time financial copilot.

You receive:
- user financial profile
- transaction context
- behavior patterns
- semantic signals describing intent, habit strength, budget pressure, regret likelihood

Use semantic signals to weigh:
- habit vs regret
- preference vs budget safety

Possible decisions:
- approve
- suggest_alternative
- friction
- block

Respond ONLY valid JSON:

{
  "decision": "...",
  "message": "...",
  "options": ["...", "..."]
}
`;

async function callLLM(messages) {
  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: HF_HEADERS,
    body: JSON.stringify({
      model: "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
      messages,
      temperature: 0.25,
      max_tokens: 350
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HF API Error: ${errorText}`);
  }

  const result = await response.json();
  return result.choices[0].message.content;
}

export async function getDecision(transactionId) {
  const context = await getMCPContext(transactionId);

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `Context:\n${JSON.stringify(context, null, 2)}`
    }
  ];

  const rawOutput = await callLLM(messages);
  try {
    return JSON.parse(rawOutput);
  } catch (err) {
    console.error("Invalid JSON from AI:", rawOutput);
    throw err;
  }
}

export function handleOverride(type) {
  recordOverride(type);
}
