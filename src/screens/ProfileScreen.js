import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import { theme } from "../theme";
import { useAuthStore } from "../store/authStore";

export default function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const interests = useAuthStore((s) => s.interests);
  const logout = useAuthStore((s) => s.logout);

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Profil</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Ad</Text>
          <Text style={styles.value}>{user?.name}</Text>

          <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>

          <Text style={[styles.label, { marginTop: 12 }]}>İlgi Alanları</Text>
          <Text style={styles.value}>{interests?.length ? interests.join(", ") : "—"}</Text>
        </View>

        <View style={{ marginTop: 16 }}>
          <AppButton title="Çıkış Yap" variant="danger" onPress={logout} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 30 },
  title: { color: theme.colors.text, fontSize: 24, fontWeight: "900", marginBottom: 14 },
  card: {
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: 16,
    ...theme.shadow.card,
  },
  label: { color: theme.colors.muted, fontWeight: "800" },
  value: { color: theme.colors.text, fontSize: 16, fontWeight: "900", marginTop: 4 },
});
