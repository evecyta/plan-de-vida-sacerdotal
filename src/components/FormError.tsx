import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  message?: string;
}

export default function FormError({
  message,
}: Props) {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="alert-circle"
        size={18}
        color="#D32F2F"
      />

      <Text style={styles.text}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },

  text: {
    marginLeft: 6,
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
});