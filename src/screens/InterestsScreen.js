import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Chip from "../components/Chip";
import AppButton from "../components/AppButton";
import { theme } from "../theme";
import { useAuthStore } from "../store/authStore";

const TAGS = ["Cyber", "AI", "Kariyer", "Girişimcilik", "Müzik", "Spor", "Tasarım", "Gönüllülük"];

export default function InterestsScreen() {
  const setInterests = useAuthStore((s) => s.setInterests);
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);

  const [selected, setSelected] = useState([]);
  const toggle = (t) => setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  const canContinue = useMemo(() => selected.length >= 3, [selected]);

  const onContinue = () => {
    if (!canContinue) return;
    setInterests(selected);
    completeOnboarding();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>İlgi Alanlarını Seç</Text>
        <Text style={styles.sub}>Öneriler için en az 3 tane seç</Text>

        <View style={styles.chips}>
          {TAGS.map((t, idx) => (
            <Chip
              key={t}
              label={t}
              active={selected.includes(t)}
              onPress={() => toggle(t)}
              tone={idx % 2 === 0 ? "primary" : "mint"}
            />
          ))}
        </View>

        <View style={{ marginTop: theme.space.lg }}>
          <AppButton title="Devam Et" onPress={onContinue} disabled={!canContinue} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  title: { color: theme.colors.text, fontSize: 26, fontWeight: "900", marginBottom: 6 },
  sub: { color: theme.colors.muted, marginBottom: 16, fontWeight: "700" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
});
