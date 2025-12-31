import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import Screen from "../components/Screen";
import { theme } from "../theme";
import { CLUBS } from "../data/clubs";
import { EVENTS } from "../data/events";

export default function ClubsScreen({ navigation }) {
  const data = useMemo(() => {
    return CLUBS.map((c) => {
      const eventCount = EVENTS.filter(
        (e) => e.club === c.name || e.club === c.shortName
      ).length;
      return { ...c, eventCount };
    });
  }, []);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Kulüpler</Text>
        <Text style={styles.sub}>
          Kayıtlı kulüpleri ve etkinliklerini keşfet.
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("ClubDetail", { clubName: item.name })
            }
            style={({ pressed }) => [
              styles.card,
              pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
            ]}
          >
            <Text style={styles.clubName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.category} numberOfLines={1}>
              {item.category}
            </Text>

            {!!item.tags?.length && (
              <Text style={styles.tags} numberOfLines={1}>
                {item.tags.join(" · ")}
              </Text>
            )}

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{item.memberCount} üye</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>
                {item.followerCount} takipçi
              </Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>
                {item.eventCount} etkinlik
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
            <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>
              Kayıtlı kulüp bulunamadı.
            </Text>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8 },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "900",
  },
  sub: {
    color: theme.colors.muted,
    marginTop: 4,
    fontWeight: "700",
    fontSize: 13,
  },

  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    marginTop: 10,
    ...theme.shadow.card,
  },
  clubName: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "900",
  },
  category: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 2,
  },
  tags: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  metaText: {
    color: theme.colors.muted,
    fontWeight: "800",
    fontSize: 12,
  },
  metaDot: {
    color: theme.colors.muted,
    fontWeight: "900",
  },
});
