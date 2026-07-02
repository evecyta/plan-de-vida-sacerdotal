import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  children,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: 20,

    marginBottom: 18,

    shadowColor: "#000",

    shadowOpacity: 0.06,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "#123B63",
    marginBottom: 12,
  },

content: {},
});