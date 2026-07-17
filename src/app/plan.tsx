import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import EmptyState from "@/components/EmptyState";
import PageHeader from "@/components/PageHeader";
import PracticeCard from "@/components/PracticeCard";
import SearchInput from "@/components/SearchInput";
import SortablePracticeList from "@/components/SortablePracticeList";

import useToast from "@/hooks/useToast";

import { MaxContentWidth } from "@/constants/theme";
import { Devotion } from "@/data/devotions";

import RuleOfLifeService from "@/services/rule-of-life";

export default function PlanScreen() {

  const router = useRouter();

  const toast = useToast();

  const [devotions, setDevotions] =
    useState<Devotion[]>([]);

  const [search, setSearch] =
    useState("");

  const [editing, setEditing] =
    useState(false);

  const [restoreVisible, setRestoreVisible] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  async function load() {

    const list =
      await RuleOfLifeService.load();

    list.sort((a, b) => a.order - b.order);

    setDevotions(list);

  }

  function newPractice() {

    router.push("/edit-practice");

  }

  function editPractice(practice: Devotion) {

    if (editing) return;

    router.push({
      pathname: "/edit-practice",
      params: {
        id: practice.id,
      },
    });

  }

  async function hidePractice(
    practice: Devotion
  ) {

    await RuleOfLifeService.disable(practice.id);

    await load();

    toast.success("Práctica ocultada");

  }

  async function showPractice(
    practice: Devotion
  ) {

    await RuleOfLifeService.enable(practice.id);

    await load();

    toast.success("Práctica visible");

  }

  async function deletePractice(
    practice: Devotion
  ) {

    await RuleOfLifeService.remove(practice.id);

    await load();

    toast.success("Práctica eliminada");

  }

  async function reorder(
    list: Devotion[]
  ) {

    setDevotions(list);

    await RuleOfLifeService.reorder(list);

  }

  async function restorePlan() {

    await RuleOfLifeService.restoreDefaults();

    await load();

    setRestoreVisible(false);

    toast.success(
      "Plan restaurado correctamente"
    );

  }

  const visible = devotions.filter(
    p => p.enabled
  );

  const hidden = devotions.filter(
    p => !p.enabled
  );

  const filtered = useMemo(() => {

    if (!search.trim()) {

      return visible;

    }

    return visible.filter(item =>

      item.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  }, [visible, search]);

    return (

    <SafeAreaView style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <PageHeader
        title="Regla de Vida"
        subtitle="Organiza y personaliza tu Plan de Vida."
        backRoute="/"
      />

              <SearchInput

                value={search}

                onChangeText={setSearch}

              />

      {filtered.length === 0 ? (

        <EmptyState
          icon="book-open-page-variant"
          title="No hay prácticas"
          description="Puedes agregar una nueva práctica o restaurar el plan original."
        />

) : editing ? (

  <SortablePracticeList
    data={filtered}
    editing
    onEdit={editPractice}
    onDelete={deletePractice}
    onToggleVisible={(practice) =>
      practice.enabled
        ? hidePractice(practice)
        : showPractice(practice)
    }
    onReorder={reorder}
  />

) : (

  <View style={{ gap: 14 }}>

    {filtered.map(practice => (

      <PracticeCard
        key={practice.id}
        title={practice.title}
        category={practice.category}
        enabled={practice.enabled}
        onPress={() => editPractice(practice)}
      />

    ))}

  </View>

)}

        {hidden.length > 0 && (

          <View style={styles.hiddenSection}>

            <Text style={styles.sectionTitle}>

              Prácticas ocultas ({hidden.length})

            </Text>

            {hidden.map(practice => (

              <PracticeCard

                key={practice.id}

                title={practice.title}

                category={practice.category}

                enabled={false}

                editing

                onPress={() => {}}

                onToggleVisible={() =>

                  showPractice(practice)

                }

              />

            ))}

          </View>

        )}

        <View style={styles.actions}>

          <Text style={styles.sectionTitle}>

            Acciones

          </Text>

          <Pressable

            style={styles.actionCard}

            onPress={newPractice}

          >

            <Text style={styles.actionIcon}>

              ➕

            </Text>

            <Text style={styles.actionText}>

              Agregar práctica

            </Text>

          </Pressable>

          <Pressable

            style={styles.actionCard}

            onPress={() =>

              setRestoreVisible(true)

            }

          >

            <Text style={styles.actionIcon}>

              🔄

            </Text>

            <Text style={styles.actionText}>

              Restaurar plan original

            </Text>

          </Pressable>

        </View>

      </ScrollView>

      <ConfirmDialog

        visible={restoreVisible}

        title="Restaurar Plan"

        message="¿Deseas restaurar el Plan de Vida original? Se perderán todas las modificaciones realizadas."

        confirmText="Restaurar"

        cancelText="Cancelar"

        destructive

        onCancel={() =>

          setRestoreVisible(false)

        }

        onConfirm={restorePlan}

      />

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

  hiddenSection: {

    marginTop: 30,

  },

  sectionTitle: {

    fontSize: 20,

    fontWeight: "700",

    color: "#123B63",

    marginBottom: 14,

  },

  actions: {

    marginTop: 34,

  },

  actionCard: {

    backgroundColor: "#FFF",

    borderRadius: 18,

    padding: 18,

    marginBottom: 14,

    flexDirection: "row",

    alignItems: "center",

    shadowColor: "#000",

    shadowOpacity: 0.05,

    shadowRadius: 8,

    shadowOffset: {

      width: 0,

      height: 2,

    },

    elevation: 2,

  },

  actionIcon: {

    fontSize: 22,

    marginRight: 14,

  },

  actionText: {

    fontSize: 17,

    fontWeight: "600",

    color: "#123B63",

  },

});