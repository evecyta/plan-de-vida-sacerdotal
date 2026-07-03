import AsyncStorage from "@react-native-async-storage/async-storage";

export interface PriestProfile {
  name: string;
  diocese: string;
  bishop: string;
  motto: string;
  ordinationDate: string;
  photo?: string;
}

const STORAGE_KEY = "priest_profile";

class SettingsService {

  async loadProfile(): Promise<PriestProfile> {

    const json = await AsyncStorage.getItem(STORAGE_KEY);

    if (json) {
      return JSON.parse(json);
    }

    return {
      name: "",
      diocese: "",
      bishop: "",
      motto: "",
      ordinationDate: "",
      photo: "",
    };

  }

  async saveProfile(profile: PriestProfile) {

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(profile)
    );

  }

}

export default new SettingsService();