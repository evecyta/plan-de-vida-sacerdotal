export interface Greeting {
  title: string;
  message: string;
}

class GreetingService {
  getGreeting(date = new Date()): Greeting {
    const hour = date.getHours();

    if (hour < 12) {
      return {
        title: "Buenos días, Padre.",
        message:
          "Este es el día que hizo el Señor; alegrémonos y gocémonos en él.",
      };
    }

    if (hour < 19) {
      return {
        title: "Buenas tardes, Padre.",
        message:
          "Permanezcan en mi amor.",
      };
    }

    return {
      title: "Buenas noches, Padre.",
      message:
        "En paz me acuesto y enseguida me duermo, porque tú, Señor, me haces vivir confiado.",
    };
  }
}

export default new GreetingService();