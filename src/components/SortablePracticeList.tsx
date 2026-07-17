import React from "react";

import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import PracticeCard from "@/components/PracticeCard";

import { Devotion } from "@/data/devotions";

interface Props {

  data: Devotion[];

  editing: boolean;

  onEdit(
    practice: Devotion
  ): void;

  onDelete(
    practice: Devotion
  ): void;

  onToggleVisible(
    practice: Devotion
  ): void;

  onReorder(
    practices: Devotion[]
  ): void;

}

export default function SortablePracticeList({

  data,

  editing,

  onEdit,

  onDelete,

  onToggleVisible,

  onReorder,

}: Props) {

  function renderItem({

    item,

    drag,

    isActive,

  }: RenderItemParams<Devotion>) {

    return (

      <View
        style={

          isActive

            ? styles.active

            : undefined

        }
      >

        <View style={styles.row}>

          {editing && (

            <Pressable

              onLongPress={drag}

              delayLongPress={150}

              style={styles.dragHandle}

            >

              <MaterialCommunityIcons

                name="drag"

                size={24}

                color="#888"

              />

            </Pressable>

          )}

          <View style={styles.card}>

            <PracticeCard

              title={item.title}

              category={item.category}

              enabled={item.enabled}

              editing={editing}

              onPress={() =>

                onEdit(item)

              }

              onDelete={() =>

                onDelete(item)

              }

              onToggleVisible={() =>

                onToggleVisible(item)

              }

            />

          </View>

                </View>

      </View>

    );

  }

  return (

    <DraggableFlatList

      data={data}

      keyExtractor={(item) => item.id}

      renderItem={renderItem}

      onDragEnd={({ data }) =>

        onReorder(data)

      }

      activationDistance={8}

      containerStyle={styles.list}

      showsVerticalScrollIndicator={false}

    />

  );

}

const styles = StyleSheet.create({

  list: {

    flexGrow: 1,

  },

  row: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 12,

  },

  dragHandle: {

    width: 42,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 6,

  },

  card: {

    flex: 1,

  },

  active: {

    opacity: 0.85,

    transform: [

      {

        scale: 1.02,

      },

    ],

  },

});