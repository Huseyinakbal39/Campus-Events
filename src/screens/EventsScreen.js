import React, { useMemo, useState } from "react";
import { View, FlatList, StyleSheet, Text, TextInput, Pressable } from "react-native";
import Screen from "../components/Screen";
import EventCard from "../components/EventCard";
import Chip from "../components/Chip";
import { theme } from "../theme";
import { EVENTS } from "../data/events";

function parseDate(s) {
  return new Date(s.replace(" ", "T"));
}
function isToday(d) {
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
}
function isWithinDays(d, days) {
  const now = new Date();
  const diffDays = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= days;
}

const ALL_TAGS = ["Cyber", "AI", "Kariyer", "Girişimcilik", "Müzik", "Spor", "Tasarım", "Gönüllülük"];

export default function EventsScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [dateFilter, setDateFilter] = useState("ALL"); // ALL | TODAY | WEEK
  const [showAllTags, setShowAllTags] = useState(false);

  // seçili tag en başa gelsin
  const orderedTags = useMemo(() => {
    if (!selectedTag) return ALL_TAGS;
    return [selectedTag, ...ALL_TAGS.filter((t) => t !== selectedTag)];
  }, [selectedTag]);

  const visibleTags = useMemo(() => {
    // kapalıyken 6 tag göster (seçili tag varsa o dahil olacak şekilde zaten başta)
    return showAllTags ? orderedTags : orderedTags.slice(0, 6);
  }, [orderedTags, showAllTags]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return EVENTS.filter((e) => {
      const matchesQuery =
        !q ||
        (e.title || "").toLowerCase().includes(q) ||
        (e.club || "").toLowerCase().includes(q);

      const tags = e.tags || [];
      const matchesTag = !selectedTag || tags.includes(selectedTag);

      const d = parseDate(e.startTime);
      let matchesDate = true;
      if (dateFilter === "TODAY") matchesDate = isToday(d);
      if (dateFilter === "WEEK") matchesDate = isWithinDays(d, 7);

      return matchesQuery && matchesTag && matchesDate;
    });
  }, [query, selectedTag, dateFilter]);

  return (
    <Screen>
      {/* Header + search + compact filters */}
      <View style={styles.header}>
        <Text style={styles.title}>Etkinlikler</Text>

        <TextInput
          style={styles.search}
          placeholder="Ara… (etkinlik / kulüp)"
          placeholderTextColor={theme.colors.muted}
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />

        {/* Date chips - compact */}
        <View style={styles.row}>
          <Chip label="Tümü" active={dateFilter === "ALL"} onPress={() => setDateFilter("ALL")} tone="mint" />
          <Chip label="Bugün" active={dateFilter === "TODAY"} onPress={() => setDateFilter("TODAY")} tone="mint" />
          <Chip label="Hafta" active={dateFilter === "WEEK"} onPress={() => setDateFilter("WEEK")} tone="mint" />
        </View>

        {/* Tags - compact + show more */}
        <View style={styles.tagsBlock}>
          <View style={styles.tagsHeader}>
            <Text style={styles.tagsTitle}>Etiket</Text>
            <Pressable onPress={() => setShowAllTags((v) => !v)} hitSlop={10}>
              <Text style={styles.tagsToggle}>{showAllTags ? "Daha az" : "Daha çok"}</Text>
            </Pressable>
          </View>

          <View style={styles.tagGrid}>
            {visibleTags.map((t, idx) => (
              <Chip
                key={t}
                label={t}
                active={selectedTag === t}
                onPress={() => setSelectedTag((prev) => (prev === t ? null : t))}
                tone={idx % 2 === 0 ? "primary" : "mint"}
              />
            ))}
          </View>
        </View>

        <Text style={styles.result}>
          {filtered.length} etkinlik{selectedTag ? ` • ${selectedTag}` : ""}{query ? ` • "${query}"` : ""}
        </Text>
      </View>

      {/* List - daha çok alan */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 8, paddingBottom: 6 }}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => navigation.navigate("EventDetail", { event: item })
        } onPressClub={(clubName) =>
          navigation.navigate("ClubDetail", { clubName })
        }/>
        )}
        ListEmptyComponent={
          <View style={{ paddingHorizontal: 16, paddingTop: 10 }}>
            <Text style={{ color: theme.colors.muted, fontWeight: "700" }}>
              Eşleşen etkinlik yok. Filtreleri kaldırmayı dene.
            </Text>
          </View>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 0, paddingBottom: 4 },

  title: { color: theme.colors.text, fontSize: 22, fontWeight: "900", marginBottom: 8 },

  search: {
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  row: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
  tagsBlock: {
    marginTop: 8,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: 8,
  },
  tagsHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
  tagsTitle: { color: theme.colors.muted, fontWeight: "900", fontSize:12 },
  tagsToggle: { color: theme.colors.primary, fontWeight: "900" , fontSize:12},

  tagGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6 },

  result: { color: theme.colors.muted, marginTop: 8, fontWeight: "800" },
});
