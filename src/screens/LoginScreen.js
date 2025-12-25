import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppInput from "../components/AppInput";
import AppButton from "../components/AppButton";
import { theme } from "../theme";
import { useAuthStore } from "../store/authStore";

export default function LoginScreen() {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async () => {
    setErr("");
    try {
      await login(email.trim(), password);
    } catch (e) {
      setErr(e.message || "Giriş başarısız");
    }
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Campus Events</Text>
        <Text style={styles.sub}>Kampüsteki etkinlikleri kaçırma.</Text>

        <AppInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
        <AppInput label="Şifre" value={password} onChangeText={setPassword} secureTextEntry />

        {!!err && <Text style={styles.err}>{err}</Text>}

        <AppButton title="Giriş Yap" onPress={onSubmit} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { color: theme.colors.text, fontSize: 34, fontWeight: "900", marginBottom: 6 },
  sub: { color: theme.colors.muted, marginBottom: 24, fontWeight: "700" },
  err: { color: theme.colors.danger, marginBottom: 12, fontWeight: "800" },
});
