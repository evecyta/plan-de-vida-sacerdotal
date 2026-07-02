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
  const remaining = total - completed;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Camino de hoy
      </Text>

      <View style={styles.percentContainer}>
        <Text style={styles.percent}>
          {percentage}
        </Text>

        <Text style={styles.percentSymbol}>
          %
        </Text>
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

      <View style={styles.footer}>
        <View>
          <Text style={styles.value}>
            {completed}
          </Text>

          <Text style={styles.label}>
            Completadas
          </Text>
        </View>

        <View>
          <Text style={styles.value}>
            {remaining}
          </Text>

          <Text style={styles.label}>
            Pendientes
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    marginBottom: 28,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  title: {
    fontSize: 16,
    color: "#777",
  },

  percentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 12,
  },

  percent: {
    fontSize: 56,
    fontWeight: "700",
    color: "#123B63",
    lineHeight: 60,
  },

  percentSymbol: {
    fontSize: 22,
    fontWeight: "700",
    color: "#123B63",
    marginTop: 8,
    marginLeft: 3,
  },

  barBackground: {
    marginTop: 18,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#E8EBEF",
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#123B63",
    borderRadius: 10,
  },

  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  value: {
    fontSize: 24,
    fontWeight: "700",
    color: "#123B63",
    textAlign: "center",
  },

  label: {
    marginTop: 4,
    fontSize: 13,
    color: "#777",
    textAlign: "center",
  },
});