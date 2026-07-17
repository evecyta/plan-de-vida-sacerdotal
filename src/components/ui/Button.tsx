import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/theme";

type Variant = "primary" | "secondary";

interface Props {

  title: string;

  onPress: () => void;

  variant?: Variant;

  disabled?: boolean;

  loading?: boolean;

}

export default function Button({

  title,

  onPress,

  variant = "primary",

  disabled = false,

  loading = false,

}: Props) {

  const isDisabled =
    disabled || loading;

  return (

    <Pressable

      disabled={isDisabled}

      onPress={onPress}

      style={({ pressed }) => [

        styles.button,

        variant === "primary"
          ? styles.primary
          : styles.secondary,

        pressed &&
          !isDisabled &&
          styles.pressed,

        isDisabled &&
          styles.disabled,

      ]}

    >

      {loading ? (

        <ActivityIndicator

          color={
            variant === "primary"
              ? Colors.white
              : Colors.primary
          }

        />

      ) : (

        <Text

          style={[

            Typography.body,

            styles.text,

            variant === "primary"

              ? styles.primaryText

              : styles.secondaryText,

          ]}

        >

          {title}

        </Text>

      )}

    </Pressable>

  );

}

const styles = StyleSheet.create({

  button: {

    height: 52,

    borderRadius: Radius.lg,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: Spacing.xl,

  },

  primary: {

    backgroundColor:
      Colors.primary,

  },

  secondary: {

    backgroundColor:
      Colors.surface,

    borderWidth: 1,

    borderColor:
      Colors.border,

  },

  pressed: {

    opacity: 0.85,

    transform: [
      {
        scale: 0.98,
      },
    ],

  },

  disabled: {

    opacity: 0.5,

  },

  text: {

    fontWeight: "700",

  },

  primaryText: {

    color: Colors.white,

  },

  secondaryText: {

    color: Colors.primary,

  },

});