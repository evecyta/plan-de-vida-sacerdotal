import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
} from "@/theme";

interface Props {

  value: number;

  min?: number;

  max?: number;

  onChange(
    value: number
  ): void;

}

export default function Stepper({

  value,

  min = 1,

  max = 99,

  onChange,

}: Props) {

  function decrease() {

    if (value > min) {

      onChange(value - 1);

    }

  }

  function increase() {

    if (value < max) {

      onChange(value + 1);

    }

  }

  return (

    <View style={styles.container}>

      <Pressable

        style={styles.button}

        onPress={decrease}

        disabled={value <= min}

      >

        <Text style={styles.symbol}>

          −

        </Text>

      </Pressable>

      <Text style={styles.value}>

        {value}

      </Text>

      <Pressable

        style={styles.button}

        onPress={increase}

        disabled={value >= max}

      >

        <Text style={styles.symbol}>

          +

        </Text>

      </Pressable>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

  },

  button: {

    width: 48,

    height: 48,

    borderRadius: Radius.round,

    borderWidth: 1,

    borderColor: Colors.border,

    backgroundColor: Colors.surface,

    justifyContent: "center",

    alignItems: "center",

  },

  symbol: {

    fontSize: 28,

    fontWeight: "700",

    color: Colors.primary,

  },

  value: {

    width: 80,

    textAlign: "center",

    fontSize: 34,

    fontWeight: "700",

    color: Colors.primary,

  },

});