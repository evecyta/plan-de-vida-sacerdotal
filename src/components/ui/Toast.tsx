import React, { useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/theme";

interface Props {

  visible: boolean;

  message: string;

  type?: "success" | "error" | "info";

  duration?: number;

  onHide(): void;

}

export default function Toast({

  visible,

  message,

  type = "success",

  duration = 2500,

  onHide,

}: Props) {

  const translateY =
    React.useRef(
      new Animated.Value(120)
    ).current;

  const opacity =
    React.useRef(
      new Animated.Value(0)
    ).current;

  useEffect(() => {

    if (!visible) {
      return;
    }

    Animated.parallel([

      Animated.spring(

        translateY,

        {

          toValue: 0,

          useNativeDriver: true,

        }

      ),

      Animated.timing(

        opacity,

        {

          toValue: 1,

          duration: 220,

          useNativeDriver: true,

        }

      ),

    ]).start();

    const timer =
      setTimeout(() => {

        Animated.parallel([

          Animated.timing(

            opacity,

            {

              toValue: 0,

              duration: 180,

              useNativeDriver: true,

            }

          ),

          Animated.timing(

            translateY,

            {

              toValue: 120,

              duration: 180,

              useNativeDriver: true,

            }

          ),

        ]).start(onHide);

      }, duration);

    return () => clearTimeout(timer);

  }, [visible]);

  if (!visible) {

    return null;

  }

  const icon =

    type === "success"

      ? "check-circle"

      : type === "error"

      ? "alert-circle"

      : "information";

  const color =

    type === "success"

      ? Colors.success

      : type === "error"

      ? Colors.error

      : Colors.primary;

  return (

    <Animated.View

      style={[

        styles.container,

        {

          opacity,

          transform: [

            {

              translateY,

            },

          ],

        },

      ]}

    >

      <MaterialCommunityIcons

        name={icon}

        size={22}

        color={color}

      />

      <Text style={styles.message}>

        {message}

      </Text>

    </Animated.View>

  );

}

const styles = StyleSheet.create({

  container: {

    position: "absolute",

    left: 20,

    right: 20,

    bottom: 35,

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.surface,

    borderRadius: Radius.xl,

    paddingHorizontal: Spacing.lg,

    paddingVertical: Spacing.md,

    shadowColor: "#000",

    shadowOpacity: 0.18,

    shadowRadius: 8,

    shadowOffset: {

      width: 0,

      height: 3,

    },

    elevation: 10,

  },

  message: {

    ...Typography.body,

    flex: 1,

    marginLeft: Spacing.md,

  },

});