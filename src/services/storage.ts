import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs, { Dayjs } from "dayjs";

import {
  Devotion,
  initialDevotions,
} from "@/data/devotions";

class StorageService {

  private getKey(date?: Dayjs) {
    const d = date ?? dayjs();

    return `daily_devotions_${d.format("YYYY-MM-DD")}`;
  }

  private createEmptyDay(): Devotion[] {
    return initialDevotions.map(item => ({
      ...item,
      completed: false,
    }));
  }

  async loadToday() {
    return this.loadDay(dayjs());
  }

  async saveToday(devotions: Devotion[]) {
    return this.saveDay(dayjs(), devotions);
  }

  async loadDay(date: Dayjs): Promise<Devotion[]> {

    try {

      const json = await AsyncStorage.getItem(
        this.getKey(date)
      );

      if (json) {
        return JSON.parse(json);
      }

      return this.createEmptyDay();

    } catch {

      return this.createEmptyDay();

    }

  }

  async saveDay(
    date: Dayjs,
    devotions: Devotion[]
  ) {

    try {

      await AsyncStorage.setItem(
        this.getKey(date),
        JSON.stringify(devotions)
      );

    } catch (e) {

      console.log(e);

    }

  }

  async clearToday() {

    await AsyncStorage.removeItem(
      this.getKey()
    );

  }

  async loadLastDays(days: number) {

    const result = [];

    for (let i = days - 1; i >= 0; i--) {

      const date = dayjs().subtract(i, "day");

      result.push({
        date,
        devotions: await this.loadDay(date),
      });

    }

    return result;

  }

}

export default new StorageService();