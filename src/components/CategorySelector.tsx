import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type Category =
  | "Liturgia"
  | "Meditación"
  | "Devociones"
  | "Formación"
  | "Ofrecimientos"
  | "Personal";

interface Props {
  value: Category;
  onChange: (category: Category) => void;
}

const categories: {
  label: Category;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}[] = [
  { label: "Liturgia", icon: "book-open-page-variant" },
  { label: "Meditación", icon: "meditation" },
  { label: "Devociones", icon: "hands-pray" },
  { label: "Formación", icon: "school" },
  { label: "Ofrecimientos", icon: "heart" },
  { label: "Personal", icon: "star-circle" },
];

export default function CategorySelector({
  value,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      {categories.map((item) => {
        const selected = value === item.label;

        return (
          <Pressable
            key={item.label}
            style={[
              styles.card,
              selected && styles.selected,
            ]}
            onPress={() => onChange(item.label)}
          >
            {selected && (
              <View style={styles.check}>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={22}
                  color="#FFFFFF"
                />
              </View>
            )}

            <MaterialCommunityIcons
              name={item.icon}
              size={26}
              color={selected ? "#FFF" : "#123B63"}
            />

            <Text
              style={[
                styles.label,
                selected && styles.labelSelected,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },

  card: {
    width: "48%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#ECECEC",
    position: "relative",
  },

  selected: {
    backgroundColor: "#123B63",
    borderColor: "#123B63",
  },

  check: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  label: {
    marginTop: 8,
    color: "#123B63",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },

  labelSelected: {
    color: "#FFF",
  },
});