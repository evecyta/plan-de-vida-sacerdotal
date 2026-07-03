import dayjs from "dayjs";
import "dayjs/locale/es";

import { StyleSheet, Text, View } from "react-native";

import QuotesService from "@/services/quotes";

dayjs.locale("es");

export default function Header() {
  const today = dayjs();

  const weekday =
    today.format("dddd").charAt(0).toUpperCase() +
    today.format("dddd").slice(1);

  const date = today.format("D [de] MMMM [de] YYYY");

  const quote =
    QuotesService.getTodayQuote();

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

      <View style={styles.quoteCard}>
        <Text style={styles.quote}>
          "{quote.text}"
        </Text>

        <Text style={styles.author}>
          {quote.author}
        </Text>
      </View>

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

  quoteCard: {
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  quote: {
    fontSize: 17,
    lineHeight: 28,
    color: "#333",
    fontStyle: "italic",
    textAlign: "center",
  },

  author: {
    marginTop: 14,
    fontSize: 14,
    color: "#777",
    textAlign: "right",
    fontWeight: "600",
  },

  divider: {
    marginTop: 22,
    height: 1,
    backgroundColor: "#ECECEC",
  },
});