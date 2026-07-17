import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Colors,
  Radius,
  Spacing,
  Typography,
} from "@/theme";

import { DevotionType } from "@/data/devotions";

interface Props {

  title: string;

  type: DevotionType;

  completed: number;

  target: number;

  editing?: boolean;

  onToggle(): void;

  onIncrement?(): void;

  onDecrement?(): void;

  onEdit?(): void;

  onDelete?(): void;

  onDrag?(): void;

}

export default function CheckItem({

  title,

  type,

  completed,

  target,

  editing = false,

  onToggle,

  onIncrement,

  onDecrement,

  onEdit,

  onDelete,

  onDrag,

}: Props) {

  const finished =

    type === "check"

      ? completed >= target

      : false;

  const isCounter =
    type === "counter";

      const content = (

    <>

      {editing && (

        <Pressable
          onLongPress={onDrag}
          delayLongPress={150}
          hitSlop={10}
          style={styles.dragButton}
        >

          <MaterialCommunityIcons
            name="drag"
            size={22}
            color={Colors.textLight}
          />

        </Pressable>

      )}

      {isCounter ? (

        <View style={styles.counterContainer}>

          <Pressable

            style={styles.counterButton}

            onPress={onDecrement}

          >

            <Text style={styles.counterSymbol}>

              −

            </Text>

          </Pressable>

          <View style={styles.counterValue}>

            <Text style={styles.counterNumber}>

              {completed}

            </Text>

          </View>

          <Pressable

            style={styles.counterButton}

            onPress={onIncrement}

          >

            <Text style={styles.counterSymbol}>

              +

            </Text>

          </Pressable>

        </View>

      ) : (

        <View
          style={[

            styles.circle,

            finished &&
              styles.circleCompleted,

          ]}
        >

          <Text
            style={[

              styles.counter,

              finished &&
                styles.counterCompleted,

            ]}
          >

            {completed}/{target}

          </Text>

        </View>

      )}

      <View style={styles.textContainer}>

        <Text
          style={[

            styles.title,

            finished &&
              styles.titleCompleted,

          ]}
        >

          {title}

        </Text>

      </View>

      {editing && (

        <View style={styles.actions}>

          <Pressable

            hitSlop={12}

            onPress={onEdit}

            style={styles.iconButton}

          >

            <MaterialCommunityIcons
              name="pencil-outline"
              size={20}
              color={Colors.primary}
            />

          </Pressable>

          <Pressable

            hitSlop={12}

            onPress={onDelete}

            style={styles.iconButton}

          >

            <MaterialCommunityIcons
              name="trash-can-outline"
              size={20}
              color={Colors.error}
            />

          </Pressable>

        </View>

      )}

    </>

  );

    if (editing) {

    return (

      <View style={styles.container}>

        {content}

      </View>

    );

  }

  return (

    <Pressable

      onPress={
        isCounter
          ? undefined
          : onToggle
      }

      style={({ pressed }) => [

        styles.container,

        pressed &&
          !isCounter &&
          styles.pressed,

      ]}

    >

      {content}

    </Pressable>

  );

}

const styles = StyleSheet.create({

  container: {

    flexDirection: "row",

    alignItems: "center",

    paddingVertical: Spacing.lg,

  },

  pressed: {

    opacity: 0.65,

  },

  dragButton: {

    width: 34,

    justifyContent: "center",

    alignItems: "center",

    marginRight: Spacing.sm,

  },

  circle: {

    width: 42,

    height: 42,

    borderRadius: 21,

    borderWidth: 2,

    borderColor: Colors.border,

    backgroundColor: Colors.surface,

    justifyContent: "center",

    alignItems: "center",

  },

  circleCompleted: {

    backgroundColor: Colors.primary,

    borderColor: Colors.primary,

  },

  counter: {

    fontSize: 12,

    fontWeight: "700",

    color: Colors.primary,

  },

  counterCompleted: {

    color: Colors.white,

  },

  counterContainer: {

    width: 120,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

  },

  counterButton: {

    width: 34,

    height: 34,

    borderRadius: 17,

    borderWidth: 1,

    borderColor: Colors.border,

    backgroundColor: Colors.surface,

    justifyContent: "center",

    alignItems: "center",

  },

  counterSymbol: {

    fontSize: 22,

    fontWeight: "700",

    color: Colors.primary,

  },

  counterValue: {

    minWidth: 36,

    alignItems: "center",

  },

  counterNumber: {

    fontSize: 20,

    fontWeight: "700",

    color: Colors.primary,

  },

  textContainer: {

    flex: 1,

    marginLeft: Spacing.lg,

  },

  title: {

    ...Typography.body,

  },

  titleCompleted: {

    color: Colors.primary,

    fontWeight: "700",

  },

  actions: {

    flexDirection: "row",

    alignItems: "center",

    gap: Spacing.md,

  },

  iconButton: {

    width: 36,

    height: 36,

    justifyContent: "center",

    alignItems: "center",

  },

});