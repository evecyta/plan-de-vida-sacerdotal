import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const MORNING = {
  hour: 7,
  minute: 0,
};

const ANGELUS = {
  hour: 12,
  minute: 0,
};

const NIGHT = {
  hour: 21,
  minute: 30,
};

class NotificationService {

  async initialize() {

    if (!Device.isDevice) {
      console.log("Las notificaciones requieren un dispositivo físico.");
      return;
    }

    const { status: currentStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = currentStatus;

    if (currentStatus !== "granted") {

      const { status } =
        await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Permisos de notificaciones denegados.");
      return;
    }

    await this.scheduleDefaultNotifications();
  }

  async scheduleDefaultNotifications() {

    await this.cancelAll();

    await this.scheduleNotification(
      "Buenos días, Padre",
      "Que el Señor bendiga esta nueva jornada.",
      MORNING.hour,
      MORNING.minute
    );

    await this.scheduleNotification(
      "Ángelus",
      "Es la hora del Ángelus.",
      ANGELUS.hour,
      ANGELUS.minute
    );

    await this.scheduleNotification(
      "Examen del día",
      "Antes de descansar, revise su Plan de Vida.",
      NIGHT.hour,
      NIGHT.minute
    );

  }

  private async scheduleNotification(
    title: string,
    body: string,
    hour: number,
    minute: number
  ) {

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    });

  }

  async cancelAll() {

    await Notifications.cancelAllScheduledNotificationsAsync();

  }

}

export default new NotificationService();