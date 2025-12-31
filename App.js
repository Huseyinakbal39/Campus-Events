import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabs from "./src/navigation/AppTabs";
import EventDetailScreen from "./src/screens/EventDetailScreen";
import InterestsScreen from "./src/screens/InterestsScreen";
import LoginScreen from "./src/screens/LoginScreen";
import ClubDetailScreen from "./src/screens/ClubDetailScreen";
import { useAuthStore } from "./src/store/authStore";
import { theme } from "./src/theme";
const Stack = createNativeStackNavigator();

export default function App() {
  const token = useAuthStore((s) => s.token);
  const hasOnboarded = useAuthStore((s) => s.hasOnboarded);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.bg },
          headerTintColor: theme.colors.text,
          headerTitleStyle: { fontWeight: "900" },
          headerBackTitleVisible: false,
        }}
      >
        {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        ) : !hasOnboarded ? (
          <Stack.Screen name="Onboarding" component={InterestsScreen} options={{ headerShown: false }} />
          ) : (
          <>
            <Stack.Screen name="Home" component={AppTabs} options={{ headerShown: false }} />
            <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: "Etkinlik" }} />
            <Stack.Screen name="ClubDetail" component={ClubDetailScreen} options={{ title: "Kulüp" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
