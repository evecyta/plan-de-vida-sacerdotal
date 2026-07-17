import { useEffect } from "react";
import { Stack } from "expo-router";

import ToastProvider from "@/providers/ToastProvider";
import NotificationService from "@/services/notification-service";

export default function RootLayout() {

  useEffect(() => {

    NotificationService.initialize();

  }, []);

  return (

    <ToastProvider>

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="day"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="plan"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="edit-practice"
          options={{
            headerShown: false,
          }}
        />

      </Stack>

    </ToastProvider>

  );

}