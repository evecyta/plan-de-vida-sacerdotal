import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Header from "@/components/Header";
import ProgressCard from "@/components/ProgressCard";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/theme";

interface Props {

  editing: boolean;

  completed: number;

  total: number;

  percentage: number;

  onToggleEditing(): void;

}

export default function TodayHeader({

  editing,

  completed,

  total,

  percentage,

  onToggleEditing,

}: Props) {

  return (

    <View>

      <Header />

      <Pressable

        style={styles.button}

        onPress={onToggleEditing}

      >

        <Text style={styles.buttonText}>

          {editing

            ? "Finalizar edición"

            : "Editar Plan"}

        </Text>

      </Pressable>

      <ProgressCard

        percentage={percentage}

        completed={completed}

        total={total}

      />

    </View>

  );

}

const styles = StyleSheet.create({

  button: {

    alignSelf: "flex-end",

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.surface,

    borderWidth: 1,

    borderColor: Colors.border,

    borderRadius: Radius.round,

    paddingHorizontal: Spacing.lg,

    paddingVertical: Spacing.sm,

    marginBottom: Spacing.xl,

  },

  buttonText: {

    ...Typography.label,

    color: Colors.primary,

  },

});