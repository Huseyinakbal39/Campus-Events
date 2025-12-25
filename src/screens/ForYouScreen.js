import React, { useMemo } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import { theme } from "../theme";
import { useAuthStore } from "../store/authStore";
import EventCard from "../components/EventCard";
import { EVENTS } from "../data/events";
import { useEventStore } from "../store/eventStore";


function scoreEvent(event, interests) {
  const tags = event.tags || [];
  let score = 0;
  for (const t of tags) if (interests.includes(t)) score += 3;
  score += 1;
  return score;
}

export default function ForYouScreen({ navigation }) {
  const interests = useAuthStore((s) => s.interests);
  const likedIds = useEventStore((s) => s.likedIds);
  const goingIds = useEventStore((s) => s.goingIds);
  function scoreEvent(event, interests, likedIds, goingIds) {
  const tags = event.tags || [];
  let score = 0;

  for (const t of tags) if (interests.includes(t)) score += 3;

  if (likedIds.has(event.id)) score += 2;
  if (goingIds.has(event.id)) score += 4;

  score += 1;
  return score;
}



  const recommended = useMemo(() => {
  const scored = EVENTS.map((e) => ({
    ...e,
    _score: scoreEvent(e, interests, likedIds, goingIds),
  }));
  scored.sort((a, b) => b._score - a._score);
  return scored;
}, [interests, likedIds, goingIds]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.title}>Senin için</Text>
        <Text style={styles.sub}>
          İlgi alanların: {interests.length ? interests.join(", ") : "—"}
        </Text>
      </View>

      <FlatList
        data={recommended}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => navigation.navigate("EventDetail", { event: item })} />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 6 },
  title: { color: theme.colors.text, fontSize: 24, fontWeight: "900" },
  sub: { color: theme.colors.muted, marginTop: 6, fontWeight: "700" },
});
