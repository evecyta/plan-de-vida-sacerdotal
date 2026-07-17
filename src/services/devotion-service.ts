import { Devotion } from "@/data/devotions";
import RuleOfLifeService from "./rule-of-life";

class DevotionService {

  async loadAll(): Promise<Devotion[]> {
    const devotions = await RuleOfLifeService.load();

    return devotions.sort(
      (a, b) => a.order - b.order
    );
  }

  async find(id: string): Promise<Devotion | null> {
    const devotions = await this.loadAll();

    return (
      devotions.find(d => d.id === id) ?? null
    );
  }

  async byCategory(
    category: string
  ): Promise<Devotion[]> {

    const devotions = await this.loadAll();

    return devotions.filter(
      d => d.category === category
    );
  }

  async save(devotions: Devotion[]) {
    await RuleOfLifeService.save(devotions);
  }
}

export default new DevotionService();