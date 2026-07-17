import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
} from "@/theme";

interface Props {

  label: string;

  selected?: boolean;

  onPress(): void;

}

export default function ChoiceChip({

  label,

  selected = false,

  onPress,

}: Props) {

  return (

    <Pressable

      onPress={onPress}

      style={[

        styles.container,

        selected &&
          styles.selected,

      ]}

    >

      <Text

        style={[

          styles.text,

          selected &&
            styles.selectedText,

        ]}

      >

        {label}

      </Text>

    </Pressable>

  );

}

const styles = StyleSheet.create({

  container: {

    paddingHorizontal: Spacing.lg,

    paddingVertical: Spacing.md,

    borderRadius: Radius.round,

    borderWidth: 1,

    borderColor: Colors.border,

    backgroundColor: Colors.surface,

    marginRight: Spacing.sm,

    marginBottom: Spacing.sm,

  },

  selected: {

    borderColor: Colors.primary,

    backgroundColor: "#EAF2FA",

  },

  text: {

    color: Colors.text,

    fontSize: 15,

    fontWeight: "500",

  },

  selectedText: {

    color: Colors.primary,

    fontWeight: "700",

  },

});