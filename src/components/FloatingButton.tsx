import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
}

export default function FloatingButton({
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="plus"
        color="#FFF"
        size={30}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 24,
    bottom: 24,

    width: 64,
    height: 64,

    borderRadius: 32,

    backgroundColor: "#123B63",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 8,
  },
});