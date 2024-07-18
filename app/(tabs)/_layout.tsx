import { Tabs } from "expo-router";

import { Ionicons } from "@expo/vector-icons";
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#28A745" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, size }) => {
            if (focused) {
              return <Ionicons name="home" size={size} color={color} />;
            }
            return <Ionicons name="home-outline" size={size} color={color} />;
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="passwords"
        options={{
          title: "Senhas",
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused, size }) => {
            if (focused) {
              return <Ionicons name="lock-closed" size={size} color={color} />;
            }
            return (
              <Ionicons name="lock-closed-outline" size={size} color={color} />
            );
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
