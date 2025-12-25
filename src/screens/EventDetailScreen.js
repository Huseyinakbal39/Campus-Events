import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import { theme } from "../theme";
import { useEventStore } from "../store/eventStore";

export default function EventDetailScreen({ route }) {
  const { event } = route.params;
  const tags = event.tags || [];

  const isLiked = useEventStore((s) => s.isLiked(event.id));
  const isGoing = useEventStore((s) => s.isGoing(event.id));
  const toggleLike = useEventStore((s) => s.toggleLike);
  const toggleGoing = useEventStore((s) => s.toggleGoing);

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.meta}>{event.club}</Text>
        <Text style={styles.meta}>{event.startTime}</Text>
        <Text style={styles.meta}>{event.location}</Text>

        {!!tags.length && (
          <Text style={styles.tags}>Etiketler: {tags.join(", ")}</Text>
        )}

        <View style={{ marginTop: theme.space.lg, gap: 10 }}>
          <AppButton
            title={isGoing ? "Katılacağım ✓" : "Katılacağım"}
            onPress={() => toggleGoing(event.id)}
          />
          <AppButton
            title={isLiked ? "Beğenildi ♥" : "Beğen"}
            variant="ghost"
            onPress={() => toggleLike(event.id)}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 20 },
  title: { color: theme.colors.text, fontSize: 24, fontWeight: "900", marginBottom: 10 },
  meta: { color: theme.colors.muted, marginBottom: 8, fontWeight: "800" },
  tags: { color: theme.colors.text, marginTop: 8, fontWeight: "800" },
});
