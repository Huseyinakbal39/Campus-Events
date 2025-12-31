import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { theme } from "../theme";
import { useEventStore } from "../store/eventStore";


export default function EventCard({ event, onPress , onPressClub}) {
  const tags = event.tags || [];
  const isLiked = useEventStore((s) => s.isLiked(event.id));
  const isGoing = useEventStore((s) => s.isGoing(event.id));

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { transform: [{ scale: 0.99 }], opacity: 0.97 }]}
    >
      <View style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{event.title}</Text>

          {(isLiked || isGoing) && (
            <Text style={styles.stateText}>
              {isGoing ? "✓ Katılacağım" : ""}{isLiked ? (isGoing ? "  •  " : "") + "♥ Beğenildi" : ""}
            </Text>
          )}
          
      </View>

  <View style={styles.badge}>
    <Pressable
            onPress={() => onPressClub && onPressClub(event.club)}
            style={({ pressed }) => [
            
              pressed && { opacity: 0.8, transform: [{ scale: 0.97 }] },
            ]}
          >
            <Text style={styles.badgeText}>{event.club}</Text>
          </Pressable>
  </View>
</View>

      <Text style={styles.meta}>{event.startTime} • {event.location}</Text>

      {!!tags.length && (
        <View style={styles.tagRow}>
          {tags.slice(0, 3).map((t) => (
            <View key={t} style={styles.tag}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
          {tags.length > 3 && <Text style={styles.more}>+{tags.length - 3}</Text>}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.space.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  topRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  title: { color: theme.colors.text, fontSize: 16, fontWeight: "900", flex: 1 },
  meta: { color: theme.colors.muted, marginTop: 8, fontWeight: "700" },

  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.chip2,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  badgeText: { color: theme.colors.text, fontWeight: "800" },

  tagRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 10, alignItems: "center" },
  tag: {
    backgroundColor: theme.colors.chip2,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: theme.radius.pill,
  },
  tagText: { color: theme.colors.text, fontWeight: "800", fontSize: 12 },
  more: { color: theme.colors.muted, fontWeight: "800" },
  stateText: {
  marginTop: 4,
  color: theme.colors.primary,
  fontWeight: "900",
  fontSize: 12,
},

});
