import dayjs from "dayjs";
import "dayjs/locale/es";
import {
  useLocalSearchParams,
} from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageHeader from "@/components/PageHeader";
import HistoryCategory from "@/components/HistoryCategory";

import { Devotion } from "@/data/devotions";
import { sections } from "@/data/sections";
import { MaxContentWidth } from "@/constants/theme";

import StatisticsService from "@/services/statistics";
import HistoryService from "@/services/history-service";

dayjs.locale("es");

export default function DayHistoryScreen() {
  const { date, from } = useLocalSearchParams<{
    date: string;
    from?: string;
  }>();

  const selectedDate = useMemo(
    () => dayjs(date),
    [date]
  );

  const [devotions, setDevotions] = useState<Devotion[]>([]);

  useEffect(() => {
    load();
  }, [date]);

async function load() {

  const history =
    await HistoryService.loadDay(
      selectedDate
    );

  const list =
    [...history.devotions].sort(
      (a, b) => a.order - b.order
    );

  setDevotions(list);

}

  const completed =
    StatisticsService.completed(devotions);

  const total =
    StatisticsService.total(devotions);

  const backRoute =
    from === "week" ? "/semana" : "/mes";

  function categoryDevotions(
    category: string
  ) {
    return devotions.filter(
      (item) => item.category === category
    );
  }
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PageHeader
          title={selectedDate.format(
            "dddd D [de] MMMM [de] YYYY"
          )}
          subtitle={`${completed} de ${total} prácticas realizadas`}
          backRoute={backRoute}
        />

        {sections.map((section) => (
          <HistoryCategory
            key={section.category}
            title={section.title}
            devotions={categoryDevotions(
              section.category
            )}
          />
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
    maxWidth: MaxContentWidth,
    width: "100%",
    alignSelf: "center",
    padding: 22,
    paddingBottom: 40,
  },
});