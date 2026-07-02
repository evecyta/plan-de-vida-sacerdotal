import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  checked: boolean;
  onToggle: () => void;
}

export default function CheckItem({
  title,
  checked,
  onToggle,
}: Props) {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.circle,
          checked && styles.circleChecked,
        ]}
      >
        {checked && <Text style={styles.check}>✓</Text>}
      </View>

      <Text
        style={[
          styles.title,
          checked && styles.titleChecked,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
  },

  pressed: {
    opacity: 0.7,
  },

  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#C7CDD5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  circleChecked: {
    backgroundColor: "#123B63",
    borderColor: "#123B63",
  },

  check: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  title: {
    flex: 1,
    marginLeft: 18,
    fontSize: 17,
    color: "#1C1C1E",
  },

  titleChecked: {
    color: "#123B63",
    fontWeight: "600",
  },
});