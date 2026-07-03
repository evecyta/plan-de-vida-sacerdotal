import { CustomDevotion } from "@/models/CustomDevotion";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "custom_devotions";

class CustomDevotionsService {

  async load(): Promise<CustomDevotion[]> {
    try {

      const json = await AsyncStorage.getItem(STORAGE_KEY);

      if (json) {
        return JSON.parse(json);
      }

      return [];

    } catch {
      return [];
    }
  }

  async save(devotions: CustomDevotion[]) {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(devotions)
    );
  }

  async add(
    title: string,
    category: string
  ) {

    const list = await this.load();

    list.push({
      id: Date.now().toString(),
      title,
      category,
      order: list.length + 1,
    });

    await this.save(list);
  }

  async remove(id: string) {

    const list = await this.load();

    await this.save(
      list.filter(item => item.id !== id)
    );

  }

}

export default new CustomDevotionsService();