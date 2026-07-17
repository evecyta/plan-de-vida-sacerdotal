import React, { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
} from "@/theme";

interface Props {

  children: ReactNode;

  style?: StyleProp<ViewStyle>;

}

export default function Card({

  children,

  style,

}: Props) {

  return (

    <View

      style={[

        styles.card,

        style,

      ]}

    >

      {children}

    </View>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor:
      Colors.surface,

    borderRadius:
      Radius.xl,

    padding:
      Spacing.xxl,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 10,

    shadowOffset: {

      width: 0,

      height: 4,

    },

    elevation: 2,

  },

});