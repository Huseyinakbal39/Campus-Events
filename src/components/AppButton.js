import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { theme } from "../theme";

export default function AppButton({ title, onPress, variant = "primary", disabled = false }) {
  const isPrimary = variant === "primary";
  const isGhost = variant === "ghost";
  const isDanger = variant === "danger";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        isPrimary && styles.primary,
        isGhost && styles.ghost,
        isDanger && styles.danger,
        disabled && { opacity: 0.45 },
        pressed && !disabled && { transform: [{ scale: 0.98 }], opacity: 0.95 },
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.text, isGhost && styles.textGhost]}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  primary: { backgroundColor: theme.colors.primary },
  danger: { backgroundColor: theme.colors.danger },
  ghost: { backgroundColor: "transparent", borderWidth: 1, borderColor: theme.colors.border },
  text: { color: theme.colors.text, fontWeight: "800" },
  textGhost: { color: theme.colors.text },
});
