import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {

  title: string;

  category: string;

  enabled?: boolean;

  editing?: boolean;

  onPress(): void;

  onDelete?(): void;

  onToggleVisible?(): void;

}

const icons: Record<
  string,
  keyof typeof MaterialCommunityIcons.glyphMap
> = {

  Liturgia:
    "book-open-page-variant",

  Meditación:
    "meditation",

  Devociones:
    "hands-pray",

  Formación:
    "school",

  Eucaristía:
    "cup",

  Ofrecimientos:
    "heart",

};

export default function PracticeCard({

  title,

  category,

  enabled = true,

  editing = false,

  onPress,

  onDelete,

  onToggleVisible,

}: Props) {

  return (

    <View style={styles.card}>

      <Pressable

        style={styles.main}

        onPress={onPress}

      >

        <MaterialCommunityIcons

          name={
            icons[category] ??
            "star-circle"
          }

          size={26}

          color="#123B63"

        />

        <View style={styles.content}>

          <Text
            style={[
              styles.title,

              !enabled &&

                styles.disabledTitle,

            ]}
          >

            {title}

          </Text>

          <Text style={styles.category}>

            {category}

          </Text>

        </View>

                {editing && (

          <View style={styles.actions}>

            <Pressable

              style={styles.iconButton}

              onPress={onToggleVisible}

            >

              <MaterialCommunityIcons

                name={
                  enabled
                    ? "eye-off-outline"
                    : "eye-outline"
                }

                size={20}

                color="#666"

              />

            </Pressable>

            <Pressable

              style={styles.iconButton}

              onPress={onDelete}

            >

              <MaterialCommunityIcons

                name="trash-can-outline"

                size={20}

                color="#D64545"

              />

            </Pressable>

          </View>

        )}

        {!editing && (

          <MaterialCommunityIcons

            name="chevron-right"

            size={22}

            color="#AAA"

          />

        )}

      </Pressable>

    </View>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: "#FFF",

    borderRadius: 18,

    marginBottom: 14,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    shadowOffset: {

      width: 0,

      height: 2,

    },

    elevation: 2,

  },

  main: {

    flexDirection: "row",

    alignItems: "center",

    padding: 18,

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

  disabledTitle: {

    color: "#AAA",

    textDecorationLine: "line-through",

  },

  category: {

    marginTop: 4,

    color: "#777",

    fontSize: 14,

  },

  actions: {

    flexDirection: "row",

    alignItems: "center",

    gap: 6,

  },

  iconButton: {

    width: 38,

    height: 38,

    borderRadius: 19,

    justifyContent: "center",

    alignItems: "center",

  },

});