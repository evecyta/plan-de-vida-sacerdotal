import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  DEVOTION_CATEGORIES,
  DevotionCategory,
} from "@/data/devotions";

interface Props {

  value: DevotionCategory;

  onChange(
    category: DevotionCategory
  ): void;

}

const icons: Record<
  DevotionCategory,
  keyof typeof MaterialCommunityIcons.glyphMap
> = {

  "Liturgia":
    "book-open-page-variant",

  "Meditación":
    "meditation",

  "Devociones":
    "hands-pray",

  "Formación":
    "school",

  "Eucaristía":
    "cup",

  "Ofrecimientos":
    "heart",

};

export default function CategorySelector({

  value,

  onChange,

}: Props) {

  return (

    <View style={styles.container}>

      {DEVOTION_CATEGORIES.map(category => {

        const selected =
          category === value;

        return (

          <Pressable

            key={category}

            style={[

              styles.card,

              selected &&
                styles.selected,

            ]}

            onPress={() =>
              onChange(category)
            }

          >

            {selected && (

              <View style={styles.check}>

                <MaterialCommunityIcons
                  name="check-circle"
                  size={22}
                  color="#FFF"
                />

              </View>

            )}

            <MaterialCommunityIcons

              name={icons[category]}

              size={26}

              color={
                selected
                  ? "#FFF"
                  : "#123B63"
              }

            />

            <Text

              style={[

                styles.label,

                selected &&
                  styles.labelSelected,

              ]}

            >

              {category}

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