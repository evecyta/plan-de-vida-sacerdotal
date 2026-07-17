import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#123B63",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hoy",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
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
            <MaterialCommunityIcons
              name="calendar-week"
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
            <MaterialCommunityIcons
              name="calendar-month"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}