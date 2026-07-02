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
      <View style={styles.header}>
        <Text style={styles.title}>
          {title}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 10,

    marginBottom: 22,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#123B63",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEF1F4",
    marginTop: 14,
    marginBottom: 10,
  },

  content: {},
});