import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../theme";

export default function Screen({ children }) {
  return (
    <View style={styles.bg}>
      {/* Bottom inset'i alma; tabbar zaten altta */}
      <SafeAreaView style={styles.safe} edges={["top"]}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: theme.colors.bg },
  safe: { flex: 1 },
});
