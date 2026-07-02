import dayjs from "dayjs";
import "dayjs/locale/es";

import { StyleSheet, Text, View } from "react-native";

dayjs.locale("es");

export default function Header() {
  const today = dayjs();

  const weekday =
    today.format("dddd").charAt(0).toUpperCase() +
    today.format("dddd").slice(1);

  const date =
    today.format("D [de] MMMM [de] YYYY");

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>
        Plan de Vida
      </Text>

      <Text style={styles.weekday}>
        {weekday}
      </Text>

      <Text style={styles.date}>
        {date}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 24,
  },

  appName: {
    fontSize: 34,
    fontWeight: "700",
    color: "#123B63",
  },

  weekday: {
    marginTop: 14,
    fontSize: 24,
    fontWeight: "600",
    color: "#1C1C1E",
  },

  date: {
    marginTop: 4,
    fontSize: 16,
    color: "#8A8A8E",
  },
});