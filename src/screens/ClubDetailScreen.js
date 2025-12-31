// src/screens/ClubDetailScreen.js
import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Screen from "../components/Screen";
import { theme } from "../theme";
import { CLUBS } from "../data/clubs";
import { EVENTS } from "../data/events";
import EventCard from "../components/EventCard";

export default function ClubDetailScreen({ route, navigation }) {
  const { clubName } = route.params; // Event'ten gelen club adı

  const club = useMemo(() => {
    const found =
      CLUBS.find(
        (c) =>
          c.name === clubName ||
          c.shortName === clubName
      ) || {
        name: clubName,
        shortName: clubName,
        category: "Öğrenci Kulübü",
        description: "Bu kulüp için detaylar yakında eklenecektir.",
        tags: [],
        followerCount: 0,
        memberCount: 0,
      };
    return found;
  }, [clubName]);

  const clubEvents = useMemo(
  () =>
    EVENTS.filter(
      (e) =>
        e.club === clubName ||
        e.club === club.name ||
        e.club === club.shortName
    ),
  [clubName, club.name, club.shortName]
);

  return (
    <Screen>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ padding: 20, paddingBottom: 24 }}
      >
        <Text style={styles.title}>{club.name}</Text>
        <Text style={styles.category}>{club.category}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Takipçi</Text>
            <Text style={styles.metaValue}>{club.followerCount}</Text>
          </View>
          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Üye</Text>
            <Text style={styles.metaValue}>{club.memberCount}</Text>
          </View>
        </View>

        {!!club.tags?.length && (
          <View style={styles.tagsRow}>
            {club.tags.map((t) => (
              <View key={t} style={styles.tagPill}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>HAKKINDA</Text>
        <Text style={styles.description}>{club.description}</Text>

        {(club.instagram || club.email) && (
          <View style={styles.infoBox}>
            {club.instagram && (
              <Text style={styles.infoText}>Instagram: {club.instagram}</Text>
            )}
            {club.email && (
              <Text style={styles.infoText}>E-posta: {club.email}</Text>
            )}
          </View>
        )}

        <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
          Kulübün Etkinlikleri
        </Text>

        {clubEvents.length === 0 ? (
          <Text style={styles.emptyText}>
            Bu kulübe ait tanımlı etkinlik bulunmuyor.
          </Text>
        ) : (
          <View style={{ marginTop: 8 }}>
            {clubEvents.map((e) => (
              <EventCard
                key={e.id}
                event={e}
                onPress={() =>
                  navigation.navigate("EventDetail", { event: e })
                }
              />
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "900",
  },
  category: {
    color: theme.colors.muted,
    marginTop: 4,
    fontWeight: "700",
  },

  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  metaBox: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  metaLabel: {
    color: theme.colors.muted,
    fontSize: 12,
    fontWeight: "800",
  },
  metaValue: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 2,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  tagPill: {
    backgroundColor: theme.colors.chip2,
    borderRadius: theme.radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tagText: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 12,
  },

  sectionTitle: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 14,
    marginTop: 14,
    marginBottom: 6,
  },
  description: {
    color: theme.colors.text,
    fontWeight: "500",
    lineHeight: 20,
  },

  infoBox: {
    marginTop: 10,
    padding: 10,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  infoText: {
    color: theme.colors.text,
    fontWeight: "700",
    fontSize: 13,
    marginBottom: 4,
  },

  emptyText: {
    color: theme.colors.muted,
    fontWeight: "700",
    fontSize: 13,
    marginTop: 4,
  },
});
