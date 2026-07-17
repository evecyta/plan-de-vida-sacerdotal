import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface Props {
  title: string;

  icon: keyof typeof MaterialCommunityIcons.glyphMap;

  color: string;

  children: ReactNode;

  /**
   * Total completado de la sección.
   */
  completed?: number;

  /**
   * Total objetivo de la sección.
   */
  total?: number;

  editing?: boolean;

  onAdd?: () => void;
}

export default function SectionCard({

  title,
  icon,
  color,

  children,

  completed = 0,
  total = 0,

  editing = false,

  onAdd,

}: Props) {

  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (

    <View style={styles.card}>

      <View style={styles.header}>

        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: `${color}18`,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color={color}
          />
        </View>

        <View style={styles.titleContainer}>

          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.subtitle}>
            {completed} de {total} • {percentage}%
          </Text>

        </View>

      </View>

      <View style={styles.divider} />

      {children}

      {editing && (

        <Pressable
          style={styles.addButton}
          onPress={onAdd}
        >

          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={20}
            color="#123B63"
          />

          <Text style={styles.addText}>
            Agregar práctica
          </Text>

        </Pressable>

      )}

    </View>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 22,

    marginBottom: 22,

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,

  },

  header: {

    flexDirection: "row",

    alignItems: "center",

  },

  iconContainer: {

    width: 46,

    height: 46,

    borderRadius: 23,

    justifyContent: "center",

    alignItems: "center",

    marginRight: 14,

  },

  titleContainer: {

    flex: 1,

  },

  title: {

    fontSize: 20,

    fontWeight: "700",

    color: "#123B63",

  },

  subtitle: {

    marginTop: 3,

    fontSize: 14,

    color: "#8A94A6",

  },

  divider: {

    marginVertical: 18,

    height: 1,

    backgroundColor: "#EDF1F5",

  },

  addButton: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    marginTop: 14,

    paddingTop: 16,

    borderTopWidth: 1,

    borderTopColor: "#EDF1F5",

  },

  addText: {

    marginLeft: 8,

    fontSize: 16,

    fontWeight: "600",

    color: "#123B63",

  },

});