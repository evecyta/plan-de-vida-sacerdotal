import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import FormInput from "@/components/FormInput";
import PageHeader from "@/components/PageHeader";
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
    const profile = await SettingsService.loadProfile();

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
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <PageHeader
          title="Mi Perfil"
          subtitle="Información personal para personalizar tu Plan de Vida."
          backRoute="/perfil"
        />

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
          placeholder="15-12-2008"
          value={ordinationDate}
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
  },

  content: {
    padding: 22,
    paddingBottom: 60,
  },
});