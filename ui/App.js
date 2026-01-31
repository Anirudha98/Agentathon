import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import SpendGuardModal from "./SpendGuardModal";
import { getDecision } from "../agent/decisionEngine";

export default function App() {
  const [decisionData, setDecisionData] = useState(null);

  async function handlePay() {
    const decision = await getDecision("starbucks");
    setDecisionData(decision);
  }

  function handleAction(action) {
    console.log("User selected:", action);
    setDecisionData(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mock UPI Payment</Text>
      <Text>Merchant: Starbucks</Text>
      <Text>Amount: ₹400</Text>

      <Button title="Pay Now" onPress={handlePay} />

      {decisionData && (
        <SpendGuardModal
          decision={decisionData.decision}
          message={decisionData.message}
          options={decisionData.options}
          onAction={handleAction}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: "center"
  },
  title: {
    fontSize: 22,
    marginBottom: 12
  }
});
