import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaxContentWidth } from "@/constants/theme";
import { Devotion } from "@/data/devotions";

import RuleOfLifeService from "@/services/rule-of-life";

import EmptyState from "@/components/EmptyState";
import FloatingButton from "@/components/FloatingButton";
import PracticeCard from "@/components/PracticeCard";

export default function PlanScreen() {
  const router = useRouter();

  const [devotions, setDevotions] = useState<Devotion[]>([]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  async function load() {
    const list = await RuleOfLifeService.load();

    list.sort((a, b) => a.order - b.order);

    setDevotions(list);
  }

  function newPractice() {
    router.push("/edit-practice");
  }

  function editPractice(id: string) {
    router.push({
      pathname: "/edit-practice",
      params: {
        id,
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Regla de Vida
        </Text>

        <Text style={styles.subtitle}>
          Aquí puedes agregar prácticas personales
          que formarán parte de tu Plan de Vida.
        </Text>

        {devotions.length === 0 ? (
          <EmptyState
            icon="star-circle"
            title="Todavía no hay prácticas"
            description="Pulsa el botón + para agregar una práctica."
            buttonTitle="Agregar práctica"
            onPress={newPractice}
          />
        ) : (
          devotions.map((item) => (
            <PracticeCard
              key={item.id}
              title={item.title}
              category={item.category}
              onPress={() => editPractice(item.id)}
            />
          ))
        )}
      </ScrollView>

      <FloatingButton onPress={newPractice} />
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
    paddingBottom: 120,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#123B63",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 28,
    lineHeight: 24,
  },
});