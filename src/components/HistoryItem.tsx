import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  completed: boolean;
}

export default function HistoryItem({
  title,
  completed,
}: Props) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={
          completed
            ? "check-circle"
            : "circle-outline"
        }
        size={22}
        color={
          completed
            ? "#123B63"
            : "#BDBDBD"
        }
      />

      <Text
        style={[
          styles.title,
          completed && styles.completed,
        ]}
      >
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },

  title: {
    marginLeft: 12,
    fontSize: 17,
    color: "#333",
  },

  completed: {
    color: "#123B63",
    fontWeight: "600",
  },
});