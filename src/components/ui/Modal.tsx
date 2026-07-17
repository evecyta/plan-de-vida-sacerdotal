import React, { ReactNode } from "react";
import {
  Modal as RNModal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Card from "./Card";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/theme";

interface Props {
  visible: boolean;

  title: string;

  children: ReactNode;

  onClose: () => void;

  footer?: ReactNode;

  showCloseButton?: boolean;

  size?: "sm" | "md" | "lg";
}

export default function Modal({

  visible,

  title,

  children,

  onClose,

  footer,

  showCloseButton = true,

  size = "md",

}: Props) {

  return (

    <RNModal

      visible={visible}

      transparent

      animationType="fade"

      statusBarTranslucent

      onRequestClose={onClose}

    >

      <View style={styles.overlay}>

        <Pressable

          style={StyleSheet.absoluteFill}

          onPress={onClose}

        />

        <Card
          style={[
            styles.card,
            size === "sm" && styles.small,
            size === "md" && styles.medium,
            size === "lg" && styles.large,
          ]}
        >

          <View style={styles.header}>

            <Text
              style={Typography.title}
            >
              {title}
            </Text>

            {showCloseButton && (

              <Pressable
                hitSlop={10}
                onPress={onClose}
              >

                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={Colors.textSecondary}
                />

              </Pressable>

            )}

          </View>

          <View style={styles.divider} />

          <View style={styles.content}>

            {children}

          </View>

          {footer && (

            <>
              <View
                style={styles.divider}
              />

              <View
                style={styles.footer}
              >
                {footer}
              </View>
            </>

          )}

        </Card>

      </View>

    </RNModal>

  );

}

const styles = StyleSheet.create({

  overlay: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "rgba(0,0,0,0.35)",

    padding: Spacing.xxl,

  },

  card: {

    width: "100%",

    maxWidth: 520,

  },

  small: {

    maxWidth: 360,

  },

  medium: {

    maxWidth: 520,

  },

  large: {

    maxWidth: 700,

  },

  header: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

  },

  divider: {

    marginVertical: Spacing.xl,

    height: 1,

    backgroundColor: Colors.divider,

  },

  content: {

    width: "100%",

  },

  footer: {

    flexDirection: "row",

    justifyContent: "flex-end",

    alignItems: "center",

    gap: Spacing.md,

  },

});