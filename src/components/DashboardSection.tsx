import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import SummaryCard from "./SummaryCard";

interface Props {
  week: number;
  month: number;
}

export default function DashboardSection({
  week,
  month,
}: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SummaryCard
        icon="calendar-week"
        title="Semana"
        subtitle="Resumen de los últimos 7 días"
        value={`${week}%`}
        onPress={() => router.push("/semana")}
      />

      <SummaryCard
        icon="calendar-month"
        title="Mes"
        subtitle="Resumen del mes actual"
        value={`${month}%`}
        onPress={() => router.push("/mes")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
});