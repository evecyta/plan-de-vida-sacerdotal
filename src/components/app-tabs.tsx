import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function AppTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#123B63",

        tabBarInactiveTintColor: "#8A8A8E",

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hoy",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="today-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="semana"
        options={{
          title: "Semana",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="calendar-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="mes"
        options={{
          title: "Mes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="stats-chart-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}