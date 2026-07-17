import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CategorySelector from "@/components/CategorySelector";
import DangerButton from "@/components/DangerButton";
import FormError from "@/components/FormError";
import FormInput from "@/components/FormInput";
import PageHeader from "@/components/PageHeader";
import PrimaryButton from "@/components/PrimaryButton";

import {
  Devotion,
  DevotionCategory,
} from "@/data/devotions";

import RuleOfLifeService from "@/services/rule-of-life";

export default function EditPracticeScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id?: string;
  }>();

  const editing = !!id;

  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<DevotionCategory>(
      "Liturgia"
    );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing) {
      loadPractice();
    }
  }, []);

  async function loadPractice() {
    const devotion =
      await RuleOfLifeService.find(id!);

    if (!devotion) {
      Alert.alert(
        "Error",
        "No fue posible cargar la práctica."
      );

      router.back();
      return;
    }

    setTitle(devotion.title);
    setCategory(devotion.category);
  }

  async function save() {
    setError("");

    if (!title.trim()) {
      setError("Debes escribir un nombre.");
      return;
    }

    try {
      setSaving(true);

      if (editing) {
        const devotion =
          await RuleOfLifeService.find(id!);

        if (!devotion) {
          throw new Error();
        }

        const updated: Devotion = {
          ...devotion,
          title: title.trim(),
          category,
        };

        await RuleOfLifeService.update(updated);
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
        Alert.alert(
          "Error",
          "No fue posible guardar la práctica."
        );
      }
    } finally {
      setSaving(false);
    }
  }

  function remove() {
    Alert.alert(
      "Eliminar práctica",
      "¿Deseas eliminar esta práctica?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: confirmRemove,
        },
      ]
    );
  }

  async function confirmRemove() {
    if (!id) return;

    try {
      await RuleOfLifeService.remove(id);
      router.back();
    } catch {
      Alert.alert(
        "Error",
        "No fue posible eliminar la práctica."
      );
    }
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
          subtitle="Agrega o modifica una práctica personal de tu Plan de Vida."
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

        <FormError message={error} />

        <CategorySelector
          value={category}
          onChange={setCategory}
        />

        <View style={styles.buttons}>
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
              onPress={remove}
            />
          )}
        </View>
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
    padding: 22,
    paddingBottom: 60,
  },

  buttons: {
    marginTop: 28,
    gap: 14,
  },
});