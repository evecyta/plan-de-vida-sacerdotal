import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/theme";

import {
  Devotion,
  DevotionCategory,
  DevotionType,
  DEVOTION_CATEGORIES,
} from "@/data/devotions";

interface Props {

  visible: boolean;

  practice?: Devotion;

  onClose(): void;

  onSave(
    practice: Omit<
      Devotion,
      "id" | "order" | "completed"
    >
  ): void;

}

export default function EditPracticeModal({

  visible,
  practice,
  onClose,
  onSave,

}: Props) {

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState<DevotionCategory>(
      "Devociones"
    );

  const [type, setType] =
    useState<DevotionType>(
      "check"
    );

  const [target, setTarget] =
    useState(1);

  const [error, setError] =
    useState("");

      useEffect(() => {

    if (!visible) {
      return;
    }

    if (practice) {

      setTitle(practice.title);

      setCategory(
        practice.category
      );

      setType(
        practice.type
      );

      setTarget(
        practice.target
      );

    } else {

      setTitle("");

      setCategory(
        "Devociones"
      );

      setType("check");

      setTarget(1);

    }

    setError("");

  }, [visible, practice]);

  function save() {

    if (!title.trim()) {

      setError(
        "Ingrese un nombre."
      );

      return;

    }

    onSave({

      title: title.trim(),

      type,

      category,

      target:
        type === "check"
          ? target
          : 0,

      enabled: true,

      custom: true,

    });

  }

  function increase() {

    if (type !== "check") {
      return;
    }

    setTarget(value =>

      Math.min(
        value + 1,
        99
      )

    );

  }

  function decrease() {

    if (type !== "check") {
      return;
    }

    setTarget(value =>

      Math.max(
        value - 1,
        1
      )

    );

  }

  return (

    <Modal

      visible={visible}

      title={
        practice
          ? "Editar práctica"
          : "Añadir práctica"
      }

      onClose={onClose}

      footer={

        <>

          <Button
            title="Cancelar"
            variant="secondary"
            onPress={onClose}
          />

          <Button
            title="Guardar"
            onPress={save}
          />

        </>

      }

    >

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <Input

          label="Nombre"

          value={title}

          onChangeText={setTitle}

          error={error}

          placeholder="Ej. Rosario"

        />

        <Text style={styles.label}>

          Categoría

        </Text>

        <View style={styles.categories}>

                  {DEVOTION_CATEGORIES.map(item => {

          const selected =
            item === category;

          return (

            <Pressable

              key={item}

              onPress={() =>
                setCategory(item)
              }

              style={[

                styles.category,

                selected &&
                  styles.categorySelected,

              ]}

            >

              <Text

                style={[

                  styles.categoryText,

                  selected &&
                    styles.categoryTextSelected,

                ]}

              >

                {item}

              </Text>

            </Pressable>

          );

        })}

        </View>

        <Text style={styles.label}>

          Tipo de práctica

        </Text>

        <View style={styles.categories}>

          <Pressable

            onPress={() =>
              setType("check")
            }

            style={[

              styles.category,

              type === "check" &&
                styles.categorySelected,

            ]}

          >

            <Text

              style={[

                styles.categoryText,

                type === "check" &&
                  styles.categoryTextSelected,

              ]}

            >

              ✔ Cumplimiento

            </Text>

          </Pressable>

          <Pressable

            onPress={() =>
              setType("counter")
            }

            style={[

              styles.category,

              type === "counter" &&
                styles.categorySelected,

            ]}

          >

            <Text

              style={[

                styles.categoryText,

                type === "counter" &&
                  styles.categoryTextSelected,

              ]}

            >

              🔢 Contador

            </Text>

          </Pressable>

          <Pressable

            onPress={() =>
              setType("journal")
            }

            style={[

              styles.category,

              type === "journal" &&
                styles.categorySelected,

            ]}

          >

            <Text

              style={[

                styles.categoryText,

                type === "journal" &&
                  styles.categoryTextSelected,

              ]}

            >

              📝 Registro pastoral

            </Text>

          </Pressable>

        </View>

        {type === "check" && (

          <>

            <Text
              style={styles.label}
            >

              Meta diaria

            </Text>

            <View style={styles.stepper}>

              <Pressable

                style={styles.stepButton}

                onPress={decrease}

                disabled={target <= 1}

              >

                <Text style={styles.stepSymbol}>

                  −

                </Text>

              </Pressable>

              <Text style={styles.target}>

                {target}

              </Text>

              <Pressable

                style={styles.stepButton}

                onPress={increase}

                disabled={target >= 99}

              >

                <Text style={styles.stepSymbol}>

                  +

                </Text>

              </Pressable>

            </View>

          </>

        )}

      </ScrollView>

    </Modal>

  );

}

const styles = StyleSheet.create({

  label: {

    ...Typography.label,

    marginBottom:
      Spacing.md,

  },

  categories: {

    flexDirection: "row",

    flexWrap: "wrap",

    marginBottom:
      Spacing.xxl,

  },

  category: {

    paddingHorizontal:
      Spacing.lg,

    paddingVertical:
      Spacing.md,

    borderRadius:
      Radius.round,

    borderWidth: 1,

    borderColor:
      Colors.border,

    backgroundColor:
      Colors.surface,

    marginRight:
      Spacing.sm,

    marginBottom:
      Spacing.sm,

  },

  categorySelected: {

    borderColor:
      Colors.primary,

    backgroundColor:
      "#EAF2FA",

  },

  categoryText: {

    color:
      Colors.text,

    fontSize: 15,

    fontWeight: "500",

  },

  categoryTextSelected: {

    color:
      Colors.primary,

    fontWeight: "700",

  },

  stepper: {

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    marginTop:
      Spacing.md,

  },

  stepButton: {

    width: 48,

    height: 48,

    borderRadius:
      Radius.round,

    backgroundColor:
      Colors.surface,

    borderWidth: 1,

    borderColor:
      Colors.border,

    justifyContent: "center",

    alignItems: "center",

  },

  stepSymbol: {

    fontSize: 28,

    fontWeight: "700",

    color:
      Colors.primary,

  },

  target: {

    width: 80,

    textAlign: "center",

    fontSize: 34,

    fontWeight: "700",

    color:
      Colors.primary,

  },

});