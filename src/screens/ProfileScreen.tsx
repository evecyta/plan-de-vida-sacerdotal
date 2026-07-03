import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FormInput from "@/components/FormInput";
import PrimaryButton from "@/components/PrimaryButton";

import SettingsService from "@/services/settings";

export default function ProfileScreen() {

  const [name, setName] = useState("");
  const [diocese, setDiocese] = useState("");
  const [bishop, setBishop] = useState("");
  const [ordinationDate, setOrdinationDate] = useState("");
  const [motto, setMotto] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const profile =
      await SettingsService.loadProfile();

    setName(profile.name);
    setDiocese(profile.diocese);
    setBishop(profile.bishop);
    setOrdinationDate(profile.ordinationDate);
    setMotto(profile.motto);
  }

  async function save() {
    await SettingsService.saveProfile({
      name,
      diocese,
      bishop,
      ordinationDate,
      motto,
      photo: "",
    });

    alert("Perfil guardado correctamente.");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.title}>
          Mi Perfil
        </Text>

        <FormInput
          label="Nombre"
          value={name}
          onChangeText={setName}
        />

        <FormInput
          label="Diócesis"
          value={diocese}
          onChangeText={setDiocese}
        />

        <FormInput
          label="Obispo"
          value={bishop}
          onChangeText={setBishop}
        />

        <FormInput
          label="Fecha de ordenación"
          value={ordinationDate}
          placeholder="15-12-2008"
          onChangeText={setOrdinationDate}
        />

        <FormInput
          label="Lema sacerdotal"
          value={motto}
          multiline
          onChangeText={setMotto}
        />

        <PrimaryButton
          title="Guardar"
          onPress={save}
        />

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
    marginBottom: 28,
  },

});