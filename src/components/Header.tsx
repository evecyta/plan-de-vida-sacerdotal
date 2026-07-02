import dayjs from "dayjs";
import "dayjs/locale/es";

import { StyleSheet, Text, View } from "react-native";

dayjs.locale("es");

export default function Header() {
  const today = dayjs();

  const weekday =
    today.format("dddd").charAt(0).toUpperCase() +
    today.format("dddd").slice(1);

  const date = today.format("D [de] MMMM [de] YYYY");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Plan de Vida
      </Text>

      <Text style={styles.day}>
        {weekday}
      </Text>

      <Text style={styles.date}>
        {date}
      </Text>

      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#123B63",
    letterSpacing: -0.8,
  },

  day: {
    marginTop: 18,
    fontSize: 26,
    fontWeight: "600",
    color: "#222",
  },

  date: {
    marginTop: 4,
    fontSize: 15,
    color: "#777",
  },

  divider: {
    marginTop: 18,
    height: 1,
    backgroundColor: "#ECECEC",
  },
});