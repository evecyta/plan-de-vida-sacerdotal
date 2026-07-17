import { StyleSheet, Text, View } from "react-native";

import { Devotion } from "@/data/devotions";

import HistoryItem from "./HistoryItem";

interface Props {
  title: string;
  devotions: Devotion[];
}

export default function HistoryCategory({
  title,
  devotions,
}: Props) {
  if (devotions.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <View style={styles.separator} />

      {devotions.map((item) => (
        <HistoryItem
        key={item.id}
        title={item.title}
        completed={item.completed >= item.target}
      />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 22,
    padding: 22,
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#123B63",
    marginBottom: 10,
  },

  separator: {
    height: 1,
    backgroundColor: "#ECECEC",
    marginBottom: 12,
  },
});