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

import MonthCalendar, {
  CalendarItem,
} from "@/components/MonthCalendar";

import PageHeader from "@/components/PageHeader";

import HistoryService, {
  HistoryDay,
} from "@/services/history-service";

dayjs.locale("es");

export default function MonthScreen() {

  const router = useRouter();

  const [selectedMonth, setSelectedMonth] =
    useState(dayjs());

  const [history, setHistory] =
    useState<HistoryDay[]>([]);

  useFocusEffect(

    useCallback(() => {

      load(selectedMonth);

    }, [selectedMonth])

  );

  async function load(
    month: dayjs.Dayjs
  ) {

    const data =
      await HistoryService.loadMonth(month);

    setHistory(data);

  }

  const calendar =
    useMemo<CalendarItem[]>(() => {

      return history.map(day => ({

        day:
          day.date.date(),

        status:

          day.percentage === 100

            ? "complete"

            : day.percentage > 0

            ? "partial"

            : "empty",

      }));

    }, [history]);

  const average =
    useMemo(() =>

      HistoryService.average(
        history
      ),

    [history]);

  function previousMonth() {

    setSelectedMonth(current =>

      current.subtract(
        1,
        "month"
      )

    );

  }

  function nextMonth() {

    if (

      selectedMonth
        .startOf("month")
        .isBefore(
          dayjs().startOf("month")
        )

    ) {

      setSelectedMonth(current =>

        current.add(
          1,
          "month"
        )

      );

    }

  }

  const isCurrentMonth =
    selectedMonth.isSame(
      dayjs(),
      "month"
    );

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

          title="Mes"

          subtitle="Consulta tu Plan de Vida por mes."

          backRoute="/"

        />

        <View
          style={styles.monthHeader}
        >

          <Pressable

            style={
              styles.arrowButton
            }

            onPress={
              previousMonth
            }

          >

            <Text
              style={styles.arrow}
            >

              ‹

            </Text>

          </Pressable>

          <Text
            style={styles.monthTitle}
          >

            {selectedMonth.format(
              "MMMM [de] YYYY"
            )}

          </Text>

          <Pressable

            style={[

              styles.arrowButton,

              isCurrentMonth &&
                styles.arrowDisabled,

            ]}

            disabled={
              isCurrentMonth
            }

            onPress={
              nextMonth
            }

          >

            <Text

              style={[

                styles.arrow,

                isCurrentMonth &&
                  styles.arrowDisabledText,

              ]}

            >

              ›

            </Text>

          </Pressable>

        </View>

        <MonthCalendar

          month={
            selectedMonth
          }

          days={
            calendar
          }

          onSelectDay={(day) =>

            router.push({

              pathname:
                "/day-history",

              params: {

                date:
                  selectedMonth
                    .date(day)
                    .format(
                      "YYYY-MM-DD"
                    ),

                from: "month",

              },

            })

          }

        />
                <View style={styles.summary}>

          <Text style={styles.summaryTitle}>
            Resumen del mes
          </Text>

          <Text style={styles.summaryLabel}>
            Promedio de cumplimiento
          </Text>

          <Text style={styles.summaryValue}>
            {average}%
          </Text>

        </View>

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

    paddingBottom: 60,

  },

  monthHeader: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 20,

  },

  arrowButton: {

    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",

    alignItems: "center",

    elevation: 2,

  },

  arrowDisabled: {

    backgroundColor: "#EFEFEF",

  },

  arrow: {

    fontSize: 30,

    fontWeight: "600",

    color: "#123B63",

  },

  arrowDisabledText: {

    color: "#C7C7C7",

  },

  monthTitle: {

    flex: 1,

    textAlign: "center",

    fontSize: 24,

    fontWeight: "700",

    color: "#123B63",

    textTransform: "capitalize",

  },

  summary: {

    marginTop: 24,

    backgroundColor: "#FFFFFF",

    borderRadius: 22,

    padding: 24,

    elevation: 2,

  },

  summaryTitle: {

    fontSize: 18,

    fontWeight: "700",

    color: "#123B63",

    marginBottom: 12,

  },

  summaryLabel: {

    fontSize: 16,

    color: "#666",

  },

  summaryValue: {

    marginTop: 8,

    fontSize: 44,

    fontWeight: "700",

    color: "#123B63",

  },

});