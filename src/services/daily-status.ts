import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs, { Dayjs } from "dayjs";

export type DailyStatus = Record<string, number>;

class DailyStatusService {

  private buildKey(date: Dayjs): string {
    return `daily_status_${date.format("YYYY-MM-DD")}`;
  }

  async load(
    date: Dayjs = dayjs()
  ): Promise<DailyStatus> {

    try {

      const json = await AsyncStorage.getItem(
        this.buildKey(date)
      );

      if (!json) {
        return {};
      }

      const data = JSON.parse(json);

      return typeof data === "object" && data !== null
        ? data
        : {};

    } catch (error) {

      console.warn(
        "[DailyStatus] Error cargando estado diario",
        error
      );

      return {};
    }
  }

  async save(
    status: DailyStatus,
    date: Dayjs = dayjs()
  ): Promise<void> {

    try {

      await AsyncStorage.setItem(
        this.buildKey(date),
        JSON.stringify(status)
      );

    } catch (error) {

      console.warn(
        "[DailyStatus] Error guardando estado diario",
        error
      );

    }
  }

  async updateValue(
    devotionId: string,
    value: number,
    date: Dayjs = dayjs()
  ): Promise<DailyStatus> {

    const status = await this.load(date);

    status[devotionId] = value;

    await this.save(status, date);

    return status;
  }

  async removeValue(
    devotionId: string,
    date: Dayjs = dayjs()
  ): Promise<DailyStatus> {

    const status = await this.load(date);

    delete status[devotionId];

    await this.save(status, date);

    return status;
  }

  async clear(
    date: Dayjs = dayjs()
  ): Promise<void> {

    try {

      await AsyncStorage.removeItem(
        this.buildKey(date)
      );

    } catch (error) {

      console.warn(
        "[DailyStatus] Error eliminando estado diario",
        error
      );

    }
  }

  async exists(
    date: Dayjs = dayjs()
  ): Promise<boolean> {

    const json = await AsyncStorage.getItem(
      this.buildKey(date)
    );

    return json !== null;
  }

}

export default new DailyStatusService();