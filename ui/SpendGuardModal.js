import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal
} from "react-native";

export default function SpendGuardModal({
  decision,
  message,
  options,
  onAction
}) {
  const [seconds, setSeconds] = useState(
    decision === "friction" ? 10 : 0
  );

  useEffect(() => {
    if (decision !== "friction") return;
    if (seconds === 0) return;

    const timer = setTimeout(() => {
      setSeconds(s => s - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, decision]);

  const locked = decision === "friction" && seconds > 0;

  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.heading}>⚠️ Spending Checkpoint</Text>

          <Text style={styles.message}>{message}</Text>

          {decision === "friction" && (
            <Text style={styles.timer}>
              ⏱ Cooling-off: {seconds}s
            </Text>
          )}

          {options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              disabled={locked}
              style={[
                styles.button,
                locked && styles.disabled
              ]}
              onPress={() => onAction(opt)}
            >
              <Text style={styles.buttonText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "85%"
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12
  },
  message: {
    fontSize: 14,
    marginBottom: 12
  },
  timer: {
    color: "#d97706",
    marginBottom: 12
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    marginTop: 8
  },
  disabled: {
    opacity: 0.5
  },
  buttonText: {
    color: "#fff",
    textAlign: "center"
  }
});
