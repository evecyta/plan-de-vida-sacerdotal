import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  useEffect,
  useState,
} from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import CategorySelector from "@/components/CategorySelector";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import DangerButton from "@/components/DangerButton";
import FormError from "@/components/FormError";
import FormInput from "@/components/FormInput";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";

import useToast from "@/hooks/useToast";

import {
  Devotion,
  DevotionCategory,
} from "@/data/devotions";

import RuleOfLifeService from "@/services/rule-of-life";

export default function EditPracticeScreen() {

  const router = useRouter();

  const toast = useToast();

  const { id } =
    useLocalSearchParams<{
      id?: string;
    }>();

  const editing = !!id;

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState<DevotionCategory>("Liturgia");

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [showDeleteDialog, setShowDeleteDialog] =
    useState(false);

  useEffect(() => {

    if (editing) {

      loadPractice();

    }

  }, []);

  async function loadPractice() {

    const practice =
      await RuleOfLifeService.find(id!);

    if (!practice) {

      router.back();

      return;

    }

    setTitle(practice.title);

    setCategory(
      practice.category
    );

  }

  async function save() {

    setError("");

    if (!title.trim()) {

      setError(
        "Debes escribir un nombre."
      );

      return;

    }

    try {

      setSaving(true);

      if (editing) {

        const practice =
          await RuleOfLifeService.find(id!);

        if (!practice) {

          return;

        }

        const updated: Devotion = {

          ...practice,

          title: title.trim(),

          category,

        };

        await RuleOfLifeService.update(
          updated
        );

        toast.success(
          "Práctica actualizada"
        );

      } else {

        await RuleOfLifeService.add({

          title: title.trim(),

          category,

          type: "check",

          target: 1,

          enabled: true,

          custom: true,

        });

      }

      router.back();

    } catch (err) {

      if (

        err instanceof Error &&

        err.message === "duplicate"

      ) {

        setError(
          "Ya existe una práctica con ese nombre."
        );

      } else {

        toast.error(
          "No fue posible guardar"
        );

      }

    } finally {

      setSaving(false);

    }

  }

  async function confirmRemove() {

    if (!id) {

      return;

    }

    setShowDeleteDialog(false);

    await RuleOfLifeService.remove(id);

    toast.success(
      "Práctica eliminada"
    );

    router.back();

  }

    return (

    <SafeAreaView style={styles.container}>

      <ScrollView

        contentContainerStyle={styles.content}

        showsVerticalScrollIndicator={false}

      >

        <PageHeader

          title={
            editing
              ? "Editar práctica"
              : "Nueva práctica"
          }

          subtitle="Agrega una práctica personal para tu Plan de Vida."

          backRoute="/plan"

        />

        <FormInput

          label="Nombre"

          placeholder="Ej.: Hora Santa"

          value={title}

          onChangeText={(text) => {

            setTitle(text);

            if (error) {

              setError("");

            }

          }}

        />

        <FormError

          message={error}

        />

        <Text style={styles.subtitle}>

          Categoría

        </Text>

        <CategorySelector

          value={category}

          onChange={setCategory}

        />

        <PrimaryButton

          title={

            saving

              ? "Guardando..."

              : editing

                ? "Guardar cambios"

                : "Guardar"

          }

          onPress={save}

          disabled={saving}

        />

        {editing && (

          <DangerButton

            title="Eliminar práctica"

            onPress={() =>

              setShowDeleteDialog(true)

            }

          />

        )}

      </ScrollView>

      <ConfirmDialog

        visible={showDeleteDialog}

        title="Eliminar práctica"

        message="¿Deseas eliminar esta práctica de tu Plan de Vida?"

        confirmText="Eliminar"

        cancelText="Cancelar"

        destructive

        onCancel={() =>

          setShowDeleteDialog(false)

        }

        onConfirm={confirmRemove}

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

    padding: 22,

    paddingBottom: 60,

  },

  subtitle: {

    marginTop: 18,

    marginBottom: 12,

    fontSize: 16,

    fontWeight: "600",

    color: "#555",

  },

});