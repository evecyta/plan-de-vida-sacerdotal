import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  value: string;
  subtitle?: string;
  onPress?: () => void;
}

export default function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  onPress,
}: Props) {
  const content = (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color="#123B63"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>
          {title}
        </Text>

        {subtitle ? (
          <Text style={styles.subtitle}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEF4FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#123B63",
  },

  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: "#777",
  },

  value: {
    fontSize: 22,
    fontWeight: "700",
    color: "#123B63",
  },
});