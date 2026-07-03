import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Perfil() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <Text style={styles.title}>
          Perfil
        </Text>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/profile")}
        >
          <View style={styles.left}>
            <MaterialCommunityIcons
              name="account-circle"
              size={28}
              color="#123B63"
            />

            <View style={styles.texts}>
              <Text style={styles.cardTitle}>
                Datos personales
              </Text>

              <Text style={styles.subtitle}>
                Nombre, diócesis, lema...
              </Text>
            </View>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#AAA"
          />
        </Pressable>

        <Pressable
          style={styles.card}
          onPress={() => router.push("/plan")}
        >
          <View style={styles.left}>
            <MaterialCommunityIcons
              name="star-circle"
              size={28}
              color="#123B63"
            />

            <View style={styles.texts}>
              <Text style={styles.cardTitle}>
                Regla de Vida
              </Text>

              <Text style={styles.subtitle}>
                Administrar prácticas
              </Text>
            </View>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="#AAA"
          />
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 22,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#123B63",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
  },

  texts: {
    marginLeft: 14,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },

  subtitle: {
    color: "#777",
    marginTop: 3,
  },
});