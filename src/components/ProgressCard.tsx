import { StyleSheet, Text, View } from "react-native";

interface Props {
  percentage: number;
  completed: number;
  total: number;
}

export default function ProgressCard({
  percentage,
  completed,
  total,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Progreso de hoy</Text>

      <View style={styles.percentContainer}>
        <Text style={styles.percent}>{percentage}</Text>

        <Text style={styles.percentSymbol}>%</Text>
      </View>

      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.subtitle}>
        {completed} de {total} completadas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  title: {
    fontSize: 16,
    color: "#666",
    marginBottom: 14,
  },

  percentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  percent: {
    fontSize: 52,
    fontWeight: "700",
    color: "#123B63",
    lineHeight: 58,
  },

  percentSymbol: {
    fontSize: 22,
    fontWeight: "700",
    color: "#123B63",
    marginTop: 8,
    marginLeft: 3,
  },

  barBackground: {
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 18,
  },

  barFill: {
    height: "100%",
    backgroundColor: "#123B63",
    borderRadius: 10,
  },

  subtitle: {
    textAlign: "center",
    marginTop: 14,
    color: "#666",
    fontSize: 16,
  },
});