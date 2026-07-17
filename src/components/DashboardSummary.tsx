import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

interface Props {
  week: number;
  month: number;
  streak: number;
}

export default function DashboardSummary({
  week,
  month,
  streak,
}: Props) {
  const router = useRouter();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Resumen
      </Text>

      <Pressable
        style={styles.row}
        onPress={() => router.push("/semana")}
      >
        <Text style={styles.label}>
          📅 Semana
        </Text>

        <Text style={styles.value}>
          {week}%
        </Text>
      </Pressable>

      <Pressable
        style={styles.row}
        onPress={() => router.push("/mes")}
      >
        <Text style={styles.label}>
          🗓 Mes
        </Text>

        <Text style={styles.value}>
          {month}%
        </Text>
      </Pressable>

      <View style={styles.row}>
        <Text style={styles.label}>
          🔥 Racha
        </Text>

        <Text style={styles.value}>
          {streak} días
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#123B63",
    marginBottom: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },

  label: {
    fontSize: 16,
    color: "#444",
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#123B63",
  },
});