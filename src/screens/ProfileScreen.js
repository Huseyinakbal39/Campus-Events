import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import { theme } from "../theme";
import { useAuthStore } from "../store/authStore";
import { useEventStore } from "../store/eventStore";
import { EVENTS } from "../data/events";

export default function ProfileScreen({ navigation }) {
  const user = useAuthStore((s) => s.user);
  const interests = useAuthStore((s) => s.interests);
  const logout = useAuthStore((s) => s.logout);

  const likedIds = useEventStore((s) => s.likedIds);
  const goingIds = useEventStore((s) => s.goingIds);

  const likedEvents = useMemo(
    () => EVENTS.filter((e) => likedIds.has(e.id)),
    [likedIds]
  );

  const goingEvents = useMemo(
    () => EVENTS.filter((e) => goingIds.has(e.id)),
    [goingIds]
  );

  const renderMiniItem = (event) => (
    <Pressable
      key={event.id}
      onPress={() => navigation.navigate("EventDetail", { event })}
      style={({ pressed }) => [
        styles.miniItem,
        pressed && { opacity: 0.8, transform: [{ scale: 0.99 }] },
      ]}
    >
      <Text style={styles.miniTitle} numberOfLines={1}>
        {event.title}
      </Text>
      <Text style={styles.miniMeta} numberOfLines={1}>
        {event.startTime} • {event.club}
      </Text>
    </Pressable>
  );

  return (
    <Screen>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ padding: 20, paddingBottom: 24 }}
      >
        <Text style={styles.title}>Profil</Text>

        {/* Kullanıcı kartı */}
        <View style={styles.card}>
          <Text style={styles.label}>Ad</Text>
          <Text style={styles.value}>{user?.name}</Text>

          <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>

          <Text style={[styles.label, { marginTop: 12 }]}>İlgi Alanları</Text>
          <Text style={styles.value}>
            {interests?.length ? interests.join(", ") : "—"}
          </Text>
        </View>

        {/* Katılacağım etkinlikler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Katılacağım Etkinlikler</Text>
          {goingEvents.length === 0 ? (
            <Text style={styles.emptyText}>
              Henüz katılacağım olarak işaretlediğin bir etkinlik yok.
            </Text>
          ) : (
            <View style={styles.miniList}>
              {goingEvents.map(renderMiniItem)}
            </View>
          )}
        </View>

        {/* Beğenilen etkinlikler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Beğendiğim Etkinlikler</Text>
          {likedEvents.length === 0 ? (
            <Text style={styles.emptyText}>
              Henüz beğendiğin bir etkinlik yok.
            </Text>
          ) : (
            <View style={styles.miniList}>
              {likedEvents.map(renderMiniItem)}
            </View>
          )}
        </View>

        <View style={{ marginTop: 16 }}>
          <AppButton title="Çıkış Yap" variant="danger" onPress={logout} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 14,
  },
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

  section: {
    marginTop: 18,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontWeight: "900",
    fontSize: 16,
    marginBottom: 8,
  },
  emptyText: {
    color: theme.colors.muted,
    fontWeight: "700",
    fontSize: 13,
  },

  miniList: {
    gap: 8,
  },
  miniItem: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  miniTitle: {
    color: theme.colors.text,
    fontWeight: "800",
    fontSize: 14,
  },
  miniMeta: {
    color: theme.colors.muted,
    fontWeight: "700",
    fontSize: 12,
    marginTop: 2,
  },
});
