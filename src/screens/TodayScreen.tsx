import { useFocusEffect, useRouter } from "expo-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import CheckItem from "@/components/CheckItem";
import DashboardSection from "@/components/DashboardSection";
import EditPracticeModal from "@/components/EditPracticeModal";
import Header from "@/components/Header";
import ProgressCard from "@/components/ProgressCard";
import SectionCard from "@/components/SectionCard";

import { MaxContentWidth } from "@/constants/theme";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/theme";

import {
  Devotion,
  DevotionCategory,
} from "@/data/devotions";

import { sections } from "@/data/sections";

import PlanService from "@/services/plan-service";
import RuleOfLifeService from "@/services/rule-of-life";
import StatisticsService from "@/services/statistics";

export default function TodayScreen() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [editing, setEditing] =
    useState(false);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [selectedPractice, setSelectedPractice] =
    useState<Devotion | undefined>();

  const [devotions, setDevotions] =
    useState<Devotion[]>([]);

  useFocusEffect(

    useCallback(() => {

      loadToday();

    }, [])

  );

  useEffect(() => {

    if (loading) {
      return;
    }

    PlanService.save(devotions);

  }, [devotions]);

  async function loadToday() {

    setLoading(true);

    try {

      const plan =
        await PlanService.load();

      setDevotions(plan);

    } finally {

      setLoading(false);

    }

  }

  async function reloadPlan() {

    await loadToday();

  }

async function toggleDevotion(devotion: Devotion) {

  console.log("Pulsada:", devotion.title);

  const completed = await PlanService.toggleCheck(devotion);

  console.log("Nuevo valor:", completed);

  setDevotions(current =>
    current.map(item =>
      item.id === devotion.id
        ? { ...item, completed }
        : item
    )
  );
}

  async function incrementDevotion(
    devotion: Devotion
  ) {

    const completed =
      await PlanService.increment(
        devotion
      );

    setDevotions(current =>

      current.map(item =>

        item.id === devotion.id

          ? {
              ...item,
              completed,
            }

          : item

      )

    );

  }

  async function decrementDevotion(
    devotion: Devotion
  ) {

    const completed =
      await PlanService.decrement(
        devotion
      );

    setDevotions(current =>

      current.map(item =>

        item.id === devotion.id

          ? {
              ...item,
              completed,
            }

          : item

      )

    );

  }

    function openNewPractice() {

    setSelectedPractice(undefined);

    setModalVisible(true);

  }

  function openEditPractice(
    practice: Devotion
  ) {

    setSelectedPractice(practice);

    setModalVisible(true);

  }

  function closeModal() {

    setModalVisible(false);

    setSelectedPractice(undefined);

  }

async function savePractice(
  practice: Omit<
    Devotion,
    "id" | "order" | "completed"
  >
) {

  try {

    if (selectedPractice) {

      await RuleOfLifeService.update({

        ...selectedPractice,

        ...practice,

      });

    } else {

      await RuleOfLifeService.add({

        ...practice,

      });

    }

    closeModal();

    await reloadPlan();

  } catch (error) {

    Alert.alert(

      "No fue posible guardar",

      error instanceof Error
        ? error.message
        : "Ocurrió un error inesperado."

    );

  }

}

  async function deletePractice(
    practice: Devotion
  ) {

    await RuleOfLifeService.remove(
      practice.id
    );

    await reloadPlan();

  }

  function sectionItems(
    category: DevotionCategory
  ) {

    return devotions

      .filter(item =>
        item.category === category
      )

      .sort(
        (a, b) => a.order - b.order
      );

  }

  function sectionCompleted(
    category: DevotionCategory
  ) {

    return StatisticsService.completed(
      sectionItems(category)
    );

  }

  function sectionTarget(
    category: DevotionCategory
  ) {

    return StatisticsService.total(
      sectionItems(category)
    );

  }

  const stats = useMemo(() => ({

    completed:
      StatisticsService.completed(
        devotions
      ),

    total:
      StatisticsService.total(
        devotions
      ),

    percentage:
      StatisticsService.percentage(
        devotions
      ),

  }), [devotions]);

  return (

    <SafeAreaView style={styles.container}>

      <ScrollView

        contentContainerStyle={styles.content}

        showsVerticalScrollIndicator={false}

      >

        <Header />

        <Pressable

          style={styles.editButton}

          onPress={() =>

            router.push("/plan")

          }

        >

          <Text style={styles.editText}>

            Administrar Plan

          </Text>

        </Pressable>

        <ProgressCard

          percentage={stats.percentage}

          completed={stats.completed}

          total={stats.total}

        />

        <DashboardSection

          week={68}

          month={82}

        />

                  {sections.map(section => {

          const items =
            sectionItems(
              section.category
            );

          if (items.length === 0) {
            return null;
          }

          return (

            <SectionCard

              key={section.category}

              title={section.title}

              icon={section.icon}

              color={section.color}

              completed={sectionCompleted(
                section.category
              )}

              total={sectionTarget(
                section.category
              )}

              editing={editing}

              onAdd={openNewPractice}

            >

              {items.map(item => (

                <CheckItem

                  key={item.id}

                  title={item.title}

                  type={item.type}

                  completed={item.completed}

                  target={item.target}

                  editing={editing}

                  onToggle={() =>
                    toggleDevotion(item)
                  }

                  onIncrement={() =>
                    incrementDevotion(item)
                  }

                  onDecrement={() =>
                    decrementDevotion(item)
                  }

                  onEdit={() =>
                    openEditPractice(item)
                  }

                  onDelete={() =>
                    deletePractice(item)
                  }

                  onDrag={() => {}}

                />

              ))}

            </SectionCard>

          );

        })}

      </ScrollView>

      <EditPracticeModal

        visible={modalVisible}

        practice={selectedPractice}

        onClose={closeModal}

        onSave={savePractice}

      />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: Colors.background,

    paddingHorizontal: Spacing.xl,

  },

  content: {

    width: "100%",

    maxWidth: MaxContentWidth,

    alignSelf: "center",

    paddingBottom: Spacing.huge,

  },

  editButton: {

    alignSelf: "flex-end",

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: Colors.surface,

    borderWidth: 1,

    borderColor: Colors.border,

    borderRadius: Radius.round,

    paddingHorizontal: Spacing.lg,

    paddingVertical: Spacing.sm,

    marginBottom: Spacing.xl,

  },

  editText: {

    ...Typography.label,

    color: Colors.primary,

  },

});