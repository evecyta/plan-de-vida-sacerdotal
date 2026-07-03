import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  category: string;
  onPress: () => void;
}

const icons: Record<
  string,
  keyof typeof MaterialCommunityIcons.glyphMap
> = {
  Liturgia: "book-open-page-variant",
  Meditación: "meditation",
  Devociones: "hands-pray",
  Formación: "school",
  Ofrecimientos: "heart",
  Personal: "star-circle",
};

export default function PracticeCard({
  title,
  category,
  onPress,
}: Props) {
  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icons[category] ?? "star-circle"}
        size={26}
        color="#123B63"
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.category}>
          {category}
        </Text>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={22}
        color="#AAA"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
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

  content: {
    flex: 1,
    marginLeft: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
  },

  category: {
    marginTop: 4,
    color: "#777",
    fontSize: 14,
  },
});