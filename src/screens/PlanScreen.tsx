import { useFocusEffect, useRouter } from "expo-router";
import {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import EmptyState from "@/components/EmptyState";
import FloatingButton from "@/components/FloatingButton";
import PageHeader from "@/components/PageHeader";
import PracticeCard from "@/components/PracticeCard";
import SearchInput from "@/components/SearchInput";

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

    list.sort(

      (a, b) =>

        a.order - b.order

    );

    setDevotions(list);

  }

  function newPractice() {

    router.push("/edit-practice");

  }

  function editPractice(
    id: string
  ) {

    router.push({

      pathname: "/edit-practice",

      params: {

        id,

      },

    });

  }

  function openRestoreDialog() {

    setRestoreVisible(true);

  }

  function closeRestoreDialog() {

    setRestoreVisible(false);

  }

  async function restorePlan() {

    try {

      await RuleOfLifeService.restoreDefaults();

      await load();

      setRestoreVisible(false);

      toast.success(
        "Plan restaurado correctamente"
      );

    } catch {

      toast.error(
        "No fue posible restaurar el plan"
      );

    }

  }

  const filtered =
    useMemo(() => {

      if (!search.trim()) {

        return devotions;

      }

      return devotions.filter(item =>

        item.title

          .toLowerCase()

          .includes(

            search.toLowerCase()

          )

      );

    }, [

      devotions,

      search,

    ]);
      return (

    <SafeAreaView style={styles.container}>

      <ScrollView

        contentContainerStyle={styles.content}

        showsVerticalScrollIndicator={false}

      >

        <PageHeader

          title="Regla de Vida"

          subtitle="Aquí puedes agregar, modificar y organizar tus prácticas personales."

          backRoute="/perfil"

          actionIcon="backup-restore"

          actionLabel="Restaurar"

          onActionPress={openRestoreDialog}

        />

        <SearchInput

          value={search}

          onChangeText={setSearch}

        />

        {devotions.length === 0 ? (

          <EmptyState

            icon="star-circle"

            title="Todavía no hay prácticas"

            description="Pulsa el botón + para crear tu primera práctica."

            buttonTitle="Agregar práctica"

            onPress={newPractice}

          />

        ) : filtered.length === 0 ? (

          <EmptyState

            icon="magnify"

            title="Sin resultados"

            description="No existe ninguna práctica con ese nombre."

          />

        ) : (

          <View style={styles.list}>

            {filtered.map(practice => (

              <PracticeCard

                key={practice.id}

                title={practice.title}

                category={practice.category}

                onPress={() =>

                  editPractice(practice.id)

                }

              />

            ))}

          </View>

        )}

      </ScrollView>

      <FloatingButton

        onPress={newPractice}

      />

      <ConfirmDialog

        visible={restoreVisible}

        title="Restaurar Plan"

        message="¿Deseas restaurar el Plan de Vida original? Se perderán todas las modificaciones realizadas."

        confirmText="Restaurar"

        cancelText="Cancelar"

        destructive

        onCancel={closeRestoreDialog}

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

    paddingBottom: 120,

  },

  list: {

    gap: 14,

  },

});