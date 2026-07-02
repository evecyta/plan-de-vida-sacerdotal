import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CheckItem from "@/components/CheckItem";
import Header from "@/components/Header";
import ProgressCard from "@/components/ProgressCard";
import SectionCard from "@/components/SectionCard";

import StatisticsService from "@/services/statistics";

import {
  Devotion,
  initialDevotions,
} from "@/data/devotions";

import StorageService from "@/services/storage";

export default function TodayScreen() {
  const [devotions, setDevotions] =
    useState<Devotion[]>(initialDevotions);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadToday();
  }, []);

  useEffect(() => {
    if (!loading) {
      StorageService.saveToday(devotions);
    }
  }, [devotions, loading]);

  async function loadToday() {
    const data = await StorageService.loadToday();

    setDevotions(data);

    setLoading(false);
  }

  function toggleDevotion(id: string) {
    setDevotions((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item
      )
    );
  }

const completed = useMemo(
  () => StatisticsService.completed(devotions),
  [devotions]
);

const percentage = useMemo(
  () => StatisticsService.percentage(devotions),
  [devotions]
);

  const sections = [
    {
      title: "📖 Liturgia de las Horas",
      category: "Liturgia",
    },
    {
      title: "🕊 Meditación",
      category: "Meditación",
    },
    {
      title: "🙏 Devociones",
      category: "Devociones",
    },
    {
      title: "📚 Formación",
      category: "Formación",
    },
    {
      title: "❤️ Ofrecimientos",
      category: "Ofrecimientos",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <ProgressCard
          percentage={percentage}
          completed={completed}
          total={devotions.length}
        />

        {sections.map((section) => (
          <SectionCard
            key={section.category}
            title={section.title}
          >
            {devotions
              .filter(
                (item) =>
                  item.category === section.category
              )
              .sort(
                (a, b) =>
                  a.order - b.order
              )
              .map((item) => (
                <CheckItem
                  key={item.id}
                  title={item.title}
                  checked={item.completed}
                  onToggle={() =>
                    toggleDevotion(item.id)
                  }
                />
              ))}
          </SectionCard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 22,
  },
});