import { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaxContentWidth } from "@/constants/theme";

import CheckItem from "@/components/CheckItem";
import Header from "@/components/Header";
import ProgressCard from "@/components/ProgressCard";
import SectionCard from "@/components/SectionCard";

import { Devotion, initialDevotions } from "@/data/devotions";
import { sections } from "@/data/sections";

import StatisticsService from "@/services/statistics";
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
    setDevotions(await StorageService.loadToday());
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

  function getSectionDevotions(category: string) {
    return devotions
      .filter((item) => item.category === category)
      .sort((a, b) => a.order - b.order);
  }

  const stats = useMemo(() => {
    const completed =
      StatisticsService.completed(devotions);

    return {
      completed,
      percentage:
        StatisticsService.percentage(devotions),
    };
  }, [devotions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />

        <ProgressCard
          percentage={stats.percentage}
          completed={stats.completed}
          total={devotions.length}
        />

        {sections.map((section) => (
          <SectionCard
            key={section.category}
            title={section.title}
            icon={section.icon}
            color={section.color}
          >
            {getSectionDevotions(section.category).map((item) => (
              <CheckItem
                key={item.id}
                title={item.title}
                checked={item.completed}
                onToggle={() => toggleDevotion(item.id)}
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

  content: {
    maxWidth: MaxContentWidth,
    width: "100%",
    alignSelf: "center",
    paddingBottom: 30,
  },
});