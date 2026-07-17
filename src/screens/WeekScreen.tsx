import dayjs from "dayjs";
import "dayjs/locale/es";

import {
  useFocusEffect,
  useRouter,
} from "expo-router";

import {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { MaxContentWidth } from "@/constants/theme";

import PageHeader from "@/components/PageHeader";

import HistoryService, {
  HistoryDay,
} from "@/services/history-service";

dayjs.locale("es");

export default function WeekScreen() {

  const router = useRouter();

  const [history, setHistory] =
    useState<HistoryDay[]>([]);

  useFocusEffect(

    useCallback(() => {

      load();

    }, [])

  );

  async function load() {

    const week =
      await HistoryService.loadWeek();

    setHistory(week);

  }

  const average =
    useMemo(() =>

      HistoryService.average(history),

    [history]);

  const completed =
    useMemo(() =>

      history.reduce(
        (sum, day) =>
          sum + day.completed,
        0
      ),

    [history]);

  const total =
    useMemo(() =>

      history.reduce(
        (sum, day) =>
          sum + day.total,
        0
      ),

    [history]);

  return (

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView

        contentContainerStyle={
          styles.content
        }

        showsVerticalScrollIndicator={
          false
        }

      >

        <PageHeader

          title="Semana"

          subtitle="Resumen de los últimos siete días."

          backRoute="/"

        />

        <View
          style={styles.summaryCard}
        >

          <Text
            style={styles.summaryLabel}
          >

            Promedio semanal

          </Text>

          <Text
            style={styles.summaryPercent}
          >

            {average}%

          </Text>

          <View
            style={styles.summaryFooter}
          >

            <Text
              style={styles.summaryText}
            >

              {completed} completadas

            </Text>

            <Text
              style={styles.summaryText}
            >

              {total - completed} pendientes

            </Text>

          </View>

        </View>
                {history.map((day) => (

          <Pressable
            key={day.date.format("YYYY-MM-DD")}
            style={styles.dayCard}
            onPress={() =>
              router.push({
                pathname: "/day-history",
                params: {
                  date: day.date.format("YYYY-MM-DD"),
                  from: "week",
                },
              })
            }
          >

            <View style={styles.row}>

              <Text style={styles.day}>

                {day.date.format(
                  "dddd D [de] MMMM"
                )}

              </Text>

              <Text style={styles.value}>

                {day.percentage}%

              </Text>

            </View>

            <Text style={styles.subtitle}>

              {day.completed} de {day.total} prácticas realizadas

            </Text>

          </Pressable>

        ))}

      </ScrollView>

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: "#F7F8FA",

  },

  content: {

    width: "100%",

    maxWidth: MaxContentWidth,

    alignSelf: "center",

    padding: 22,

    paddingBottom: 40,

  },

  summaryCard: {

    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 24,

    marginBottom: 22,

    elevation: 2,

  },

  summaryLabel: {

    fontSize: 16,

    color: "#666",

  },

  summaryPercent: {

    marginTop: 10,

    textAlign: "center",

    fontSize: 42,

    fontWeight: "700",

    color: "#123B63",

  },

  summaryFooter: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 18,

  },

  summaryText: {

    fontSize: 15,

    color: "#666",

  },

  dayCard: {

    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 18,

    marginBottom: 14,

    elevation: 2,

  },

  row: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },

  day: {

    flex: 1,

    marginRight: 12,

    fontSize: 18,

    fontWeight: "600",

    color: "#222",

    textTransform: "capitalize",

  },

  value: {

    fontSize: 18,

    fontWeight: "700",

    color: "#123B63",

  },

  subtitle: {

    marginTop: 10,

    fontSize: 15,

    color: "#666",

  },

});