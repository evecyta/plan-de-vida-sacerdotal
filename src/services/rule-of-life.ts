import AsyncStorage from "@react-native-async-storage/async-storage";

import { Devotion, initialDevotions } from "@/data/devotions";

const STORAGE_KEY = "rule_of_life";

class RuleOfLifeService {
  async load(): Promise<Devotion[]> {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);

      if (!json) {
        return [];
      }

      return JSON.parse(json) as Devotion[];
    } catch {
      return [];
    }
  }

  private async save(devotions: Devotion[]) {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(devotions)
    );
  }

  private normalize(text: string) {
    return text.trim().toLowerCase();
  }

  async exists(title: string, ignoreId?: string) {
    const devotions = await this.load();

    return devotions.some(
      (item) =>
        this.normalize(item.title) ===
          this.normalize(title) &&
        item.id !== ignoreId
    );
  }

  async add(
    devotion: Omit<Devotion, "id" | "order">
  ): Promise<Devotion> {
    if (await this.exists(devotion.title)) {
      throw new Error("duplicate");
    }

    const devotions = await this.load();

    const maxOrder = Math.max(
      initialDevotions.length,
      ...devotions.map((d) => d.order)
    );

    const newDevotion: Devotion = {
      ...devotion,
      id: Date.now().toString(),
      order: maxOrder + 1,
    };

    devotions.push(newDevotion);

    await this.save(devotions);

    return newDevotion;
  }

  async update(devotion: Devotion) {
    if (
      await this.exists(
        devotion.title,
        devotion.id
      )
    ) {
      throw new Error("duplicate");
    }

    const devotions = await this.load();

    const updated = devotions.map((item) =>
      item.id === devotion.id ? devotion : item
    );

    await this.save(updated);
  }

  async remove(id: string) {
    const devotions = await this.load();

    await this.save(
      devotions.filter((item) => item.id !== id)
    );
  }

  async find(id: string) {
    const devotions = await this.load();

    return (
      devotions.find((item) => item.id === id) ??
      null
    );
  }
}

export default new RuleOfLifeService();