import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useEffect, useState } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import CategorySelector, {
  Category,
} from "@/components/CategorySelector";
import DangerButton from "@/components/DangerButton";
import FormError from "@/components/FormError";
import FormInput from "@/components/FormInput";
import PrimaryButton from "@/components/PrimaryButton";

import { Devotion } from "@/data/devotions";

import RuleOfLifeService from "@/services/rule-of-life";

export default function EditPracticeScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{
    id?: string;
  }>();

  const editing = !!id;

  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<Category>("Personal");

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

      router.replace("/plan");

      return;
    }

    setTitle(devotion.title);
    setCategory(devotion.category as Category);
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

        await RuleOfLifeService.update(
          updated
        );
      } else {
        await RuleOfLifeService.add({
          title: title.trim(),
          category,
          completed: false,
          custom: true,
        });
      }

      router.replace("/plan");
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

    await RuleOfLifeService.remove(id);

    router.replace("/plan");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          {editing
            ? "Editar práctica"
            : "Nueva práctica"}
        </Text>

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
            onPress={remove}
          />
        )}
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

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#123B63",
    marginBottom: 28,
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 12,
    marginTop: 10,
  },
});