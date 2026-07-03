import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import PrimaryButton from "@/components/PrimaryButton";

interface Props {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
  buttonTitle?: string;
  onPress?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  buttonTitle,
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={60}
        color="#123B63"
      />

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.description}>
        {description}
      </Text>

      {buttonTitle && onPress && (
        <PrimaryButton
          title={buttonTitle}
          onPress={onPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignItems: "center",
  },

  title: {
    marginTop: 18,
    fontSize: 24,
    fontWeight: "700",
    color: "#123B63",
    textAlign: "center",
  },

  description: {
    marginTop: 12,
    textAlign: "center",
    color: "#666",
    lineHeight: 24,
    fontSize: 16,
    marginBottom: 26,
  },
});