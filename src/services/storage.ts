import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

import { Devotion, initialDevotions } from "@/data/devotions";

class StorageService {
  private getTodayKey() {
    return `daily_devotions_${dayjs().format("YYYY-MM-DD")}`;
  }

  async loadToday(): Promise<Devotion[]> {
    try {
      const key = this.getTodayKey();

      const data = await AsyncStorage.getItem(key);

      if (data) {
        return JSON.parse(data);
      }

      return initialDevotions.map((item) => ({
        ...item,
        completed: false,
      }));
    } catch (error) {
      console.log(error);

      return initialDevotions.map((item) => ({
        ...item,
        completed: false,
      }));
    }
  }

  async saveToday(devotions: Devotion[]) {
    try {
      const key = this.getTodayKey();

      await AsyncStorage.setItem(
        key,
        JSON.stringify(devotions)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async clearToday() {
    const key = this.getTodayKey();

    await AsyncStorage.removeItem(key);
  }
}

export default new StorageService();