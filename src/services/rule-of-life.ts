import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  DEFAULT_DEVOTIONS,
  Devotion,
} from "@/data/devotions";

const STORAGE_KEY = "rule_of_life";

class RuleOfLifeService {

  // ------------------------------------------------------------
  // CARGA Y GUARDADO
  // ------------------------------------------------------------

async load(): Promise<Devotion[]> {

  try {

    const json = await AsyncStorage.getItem(STORAGE_KEY);

    if (!json) {

      const defaults = DEFAULT_DEVOTIONS.map(item => ({
        ...item,
        completed: 0,
        enabled: item.enabled ?? true,
      }));

      await this.save(defaults);

      return defaults;

    }

    const devotions =
      JSON.parse(json) as Devotion[];

    return devotions.sort(
      (a, b) => a.order - b.order
    );

  } catch {

    return [];

  }

}
  async save(
    devotions: Devotion[]
  ): Promise<void> {

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(devotions)
    );

  }

  // ------------------------------------------------------------
  // HELPERS
  // ------------------------------------------------------------

  private normalize(
    text: string
  ): string {

    return text
      .trim()
      .toLowerCase();

  }

  async exists(
    title: string,
    ignoreId?: string
  ): Promise<boolean> {

    const devotions =
      await this.load();

    return devotions.some(item =>

      this.normalize(item.title) ===
      this.normalize(title)

      &&

      item.id !== ignoreId

    );

  }

  async find(
    id: string
  ): Promise<Devotion | null> {

    const devotions =
      await this.load();

    return (

      devotions.find(
        item => item.id === id
      ) ?? null

    );

  }

  // ------------------------------------------------------------
  // CRUD
  // ------------------------------------------------------------

  async add(
    devotion: Omit<
      Devotion,
      "id" | "order" | "completed"
    >
  ): Promise<Devotion> {

    if (
      await this.exists(devotion.title)
    ) {
      throw new Error("duplicate");
    }

    const devotions =
      await this.load();

    const maxOrder = Math.max(
      0,
      ...devotions.map(item => item.order)
    );

    const newDevotion: Devotion = {

      ...devotion,

      id: Date.now().toString(),

      order: maxOrder + 1,

      completed: 0,

      enabled: devotion.enabled ?? true,

      custom: true,

    };

    devotions.push(newDevotion);

    await this.save(devotions);

    return newDevotion;

  }

  async update(
    devotion: Devotion
  ): Promise<void> {

    if (
      await this.exists(
        devotion.title,
        devotion.id
      )
    ) {
      throw new Error("duplicate");
    }

    const devotions =
      await this.load();

    const updated =
      devotions.map(item =>

        item.id === devotion.id
          ? devotion
          : item

      );

    await this.save(updated);

  }

  async remove(
    id: string
  ): Promise<void> {

    const devotions =
      await this.load();

    const updated =
      devotions.filter(
        item => item.id !== id
      );

    await this.save(updated);

  }

  // ------------------------------------------------------------
  // VISIBILIDAD
  // ------------------------------------------------------------

  async enable(
    id: string
  ): Promise<void> {

    const devotions =
      await this.load();

    await this.save(

      devotions.map(item =>

        item.id === id

          ? {
              ...item,
              enabled: true,
            }

          : item

      )

    );

  }

  async disable(
    id: string
  ): Promise<void> {

    const devotions =
      await this.load();

    await this.save(

      devotions.map(item =>

        item.id === id

          ? {
              ...item,
              enabled: false,
            }

          : item

      )

    );

  }

  // ------------------------------------------------------------
  // RESTAURAR
  // ------------------------------------------------------------

  async restoreDefaults(): Promise<void> {

    await this.save(

      DEFAULT_DEVOTIONS.map(item => ({

        ...item,

        completed: 0,

        enabled: true,

      }))

    );

  }

  // ------------------------------------------------------------
  // ORDEN
  // ------------------------------------------------------------

  async reorder(
    devotions: Devotion[]
  ): Promise<void> {

    const reordered = devotions.map(

      (item, index) => ({

        ...item,

        order: index + 1,

      })

    );

    await this.save(
      reordered
    );

  }

}

export default new RuleOfLifeService();