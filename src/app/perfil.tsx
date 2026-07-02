import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PerfilScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F8FA",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#123B63",
  },
});