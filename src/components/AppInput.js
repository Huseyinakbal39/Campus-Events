import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { theme } from "../theme";

export default function AppInput({ label, ...props }) {
  return (
    <View style={{ marginBottom: theme.space.md }}>
      {!!label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholderTextColor="rgba(234,240,255,0.45)"
        style={styles.input}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: theme.colors.muted, marginBottom: 8, fontWeight: "700" },
  input: {
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: 14,
  },
});
