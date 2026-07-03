import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Pressable,
    StyleSheet,
    Text,
} from "react-native";

interface Props {
  title: string;
  onPress: () => void;
}

export default function DangerButton({
  title,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="delete-outline"
        size={20}
        color="#D32F2F"
      />

      <Text style={styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,

    marginTop: 28,

    borderRadius: 16,

    borderWidth: 1,

    borderColor: "#F2B8B5",

    backgroundColor: "#FFF5F5",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",
  },

  text: {
    marginLeft: 8,

    color: "#D32F2F",

    fontWeight: "700",

    fontSize: 16,
  },
});