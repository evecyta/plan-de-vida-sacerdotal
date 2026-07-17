import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";

import CheckItem from "./CheckItem";

import { Devotion } from "@/data/devotions";

interface Props {
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;

  data: Devotion[];

  onToggle: (id: string) => void;

  onReorder: (
    category: string,
    items: Devotion[]
  ) => void;
}

export default function SortableSection({
  title,
  icon,
  color,
  data,
  onToggle,
  onReorder,
}: Props) {

  const [editing, setEditing] =
    useState(false);

  const [items, setItems] =
    useState<Devotion[]>(data);

  useEffect(() => {
    setItems(data);
  }, [data]);

  function finishEdition() {

    setEditing(false);

    onReorder(
      data[0]?.category ?? "",
      items
    );
  }

  function renderItem({
    item,
    drag,
    isActive,
  }: RenderItemParams<Devotion>) {

    return (
      <View
        style={[
          styles.item,
          isActive && styles.activeItem,
        ]}
      >

        <View style={styles.row}>

          {editing && (
            <TouchableOpacity
              onLongPress={drag}
              delayLongPress={150}
              style={styles.dragHandle}
            >
              <MaterialCommunityIcons
                name="drag"
                size={22}
                color="#7A7A7A"
              />
            </TouchableOpacity>
          )}

          <View style={styles.checkContainer}>
          <CheckItem
            title={item.title}
            type={item.type}
            completed={item.completed}
            target={item.target}
            editing={editing}
            onToggle={() => {
              if (!editing) {
                onToggle(item.id);
              }
            }}
          />
          </View>

        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>

      <View style={styles.header}>

        <View style={styles.headerLeft}>

          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${color}15` },
            ]}
          >
            <MaterialCommunityIcons
              name={icon}
              size={22}
              color={color}
            />
          </View>

          <Text style={styles.title}>
            {title}
          </Text>

        </View>

        <TouchableOpacity
          onPress={() => {

            if (editing) {
              finishEdition();
            } else {
              setEditing(true);
            }

          }}
        >
          <Text style={styles.editButton}>
            {editing ? "Listo" : "Ordenar"}
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.divider} />

      <DraggableFlatList
        data={items}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        activationDistance={5}
        onDragEnd={({ data }) => {
          setItems(data);
        }}
        renderItem={renderItem}
      />

    </View>
  );
  }
  const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 22,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: "#123B63",
  },

  editButton: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2B6CB0",
  },

  divider: {
    marginVertical: 16,
    height: 1,
    backgroundColor: "#EEF1F4",
  },

  item: {
    borderRadius: 12,
  },

  activeItem: {
    backgroundColor: "#F5F8FC",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  dragHandle: {
    width: 34,
    justifyContent: "center",
    alignItems: "center",
  },

  checkContainer: {
    flex: 1,
  },
});