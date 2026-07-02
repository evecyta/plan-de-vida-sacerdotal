import dayjs from "dayjs";
import "dayjs/locale/es";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import StatisticsService from "@/services/statistics";
import StorageService from "@/services/storage";

dayjs.locale("es");

interface Resume {
  average: number;
  completedDays: number;
  bestDay: number;
  streak: number;
}

export default function MonthScreen() {

  const [resume, setResume] = useState<Resume>({
    average: 0,
    completedDays: 0,
    bestDay: 0,
    streak: 0,
  });

  useEffect(() => {
    loadMonth();
  }, []);

  async function loadMonth() {

    const data =
      await StorageService.loadLastDays(30);

    let completed = 0;
    let total = 0;

    let completedDays = 0;
    let bestDay = 0;
    let streak = 0;
    let currentStreak = 0;

    for (const day of data) {

      const percent =
        StatisticsService.percentage(
          day.devotions
        );

      completed +=
        StatisticsService.completed(
          day.devotions
        );

      total +=
        StatisticsService.total(
          day.devotions
        );

      if (percent === 100) {
        completedDays++;
      }

      if (percent > bestDay) {
        bestDay = percent;
      }

      if (percent > 0) {
        currentStreak++;

        if (currentStreak > streak) {
          streak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }

    }

    setResume({

      average:
        total === 0
          ? 0
          : Math.round(
              (completed / total) * 100
            ),

      completedDays,

      bestDay,

      streak,

    });

  }

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>
          Resumen mensual
        </Text>

        <View style={styles.card}>

          <Text style={styles.label}>
            Promedio del mes
          </Text>

          <Text style={styles.percent}>
            {resume.average}%
          </Text>

          <View style={styles.progress}>
            <View
              style={[
                styles.fill,
                {
                  width: `${resume.average}%`,
                },
              ]}
            />
          </View>

        </View>

        <View style={styles.stats}>

          <View style={styles.smallCard}>
            <Text style={styles.big}>
              {resume.completedDays}
            </Text>

            <Text style={styles.small}>
              Días completos
            </Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.big}>
              {resume.bestDay}%
            </Text>

            <Text style={styles.small}>
              Mejor día
            </Text>
          </View>

        </View>

        <View style={styles.smallCard}>

          <Text style={styles.big}>
            {resume.streak}
          </Text>

          <Text style={styles.small}>
            Mejor racha
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
    padding: 22,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#123B63",
    marginBottom: 22,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 22,
  },

  label: {
    fontSize: 16,
    color: "#666",
  },

  percent: {
    textAlign: "center",
    fontSize: 52,
    fontWeight: "700",
    color: "#123B63",
    marginVertical: 18,
  },

  progress: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  fill: {
    height: "100%",
    backgroundColor: "#123B63",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  smallCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 4,
    alignItems: "center",
  },

  big: {
    fontSize: 34,
    fontWeight: "700",
    color: "#123B63",
  },

  small: {
    marginTop: 8,
    fontSize: 15,
    color: "#666",
    textAlign: "center",
  },

});