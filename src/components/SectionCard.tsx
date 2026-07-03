import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  children: ReactNode;
}

export default function SectionCard({
  title,
  icon,
  color,
  children,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${color}15` },
          ]}
        >
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color={color}
          />
        </View>

        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.divider} />

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#123B63",
    flex: 1,
  },

  divider: {
    marginVertical: 16,
    height: 1,
    backgroundColor: "#EEF1F4",
  },
});