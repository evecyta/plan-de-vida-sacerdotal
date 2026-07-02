import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Devotion } from "@/data/devotions";
import StatisticsService from "@/services/statistics";

dayjs.locale("es");

interface DayResume {
  day: string;
  completed: number;
  total: number;
}

export default function WeekScreen() {
  const [week, setWeek] = useState<DayResume[]>([]);

  useEffect(() => {
    loadWeek();
  }, []);

  async function loadWeek() {
    const result: DayResume[] = [];

    for (const date of StatisticsService.getWeekDates()) {
      const key = StatisticsService.storageKey(date);

      const json = await AsyncStorage.getItem(key);

      const day =
        date.format("dddd").charAt(0).toUpperCase() +
        date.format("dddd").slice(1);

      if (json) {
        const devotions: Devotion[] = JSON.parse(json);

        result.push({
          day,
          completed: StatisticsService.completed(devotions),
          total: StatisticsService.total(devotions),
        });
      } else {
        result.push({
          day,
          completed: 0,
          total: 19,
        });
      }
    }

    setWeek(result);
  }

  const totalCompleted = week.reduce(
    (sum, day) => sum + day.completed,
    0
  );

  const totalPractices = week.reduce(
    (sum, day) => sum + day.total,
    0
  );

  const average =
    totalPractices === 0
      ? 0
      : Math.round((totalCompleted / totalPractices) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Resumen semanal
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>
            Promedio semanal
          </Text>

          <Text style={styles.summaryPercent}>
            {average}%
          </Text>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${average}%`,
                },
              ]}
            />
          </View>

          <View style={styles.summaryFooter}>
            <Text style={styles.summaryText}>
              {totalCompleted} completadas
            </Text>

            <Text style={styles.summaryText}>
              {totalPractices - totalCompleted} pendientes
            </Text>
          </View>
        </View>

        {week.map((item) => {
          const percent =
            Math.round(
              (item.completed / item.total) * 100
            ) || 0;

          return (
            <View
              key={item.day}
              style={styles.dayCard}
            >
              <View style={styles.row}>
                <Text style={styles.day}>
                  {item.day}
                </Text>

                <Text style={styles.value}>
                  {percent}%
                </Text>
              </View>

              <View
                style={styles.progressBackground}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percent}%`,
                    },
                  ]}
                />
              </View>

              <Text style={styles.subtitle}>
                {item.completed} de {item.total}
                {" "}prácticas
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#123B63",
    marginBottom: 20,
  },

  summaryCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  summaryLabel: {
    fontSize: 17,
    color: "#777",
  },

  summaryPercent: {
    marginTop: 12,
    marginBottom: 18,
    fontSize: 48,
    fontWeight: "700",
    color: "#123B63",
    textAlign: "center",
  },

  summaryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  summaryText: {
    color: "#666",
    fontSize: 15,
  },

  dayCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  day: {
    fontSize: 19,
    fontWeight: "600",
    color: "#222",
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#123B63",
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#123B63",
  },

  subtitle: {
    marginTop: 12,
    color: "#666",
    fontSize: 15,
  },
});