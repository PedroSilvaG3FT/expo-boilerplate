import * as Calendar from "expo-calendar";

export class CalendarHelper {
  static async ensurePermissions(): Promise<boolean> {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    return status === "granted";
  }

  static async getOrCreateCalendar(): Promise<string | null> {
    try {
      const granted = await this.ensurePermissions();
      if (!granted) return null;

      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );

      const writableCalendar = calendars.find(
        (cal) =>
          cal.allowsModifications &&
          cal.accessLevel !== undefined &&
          cal.accessLevel !== Calendar.CalendarAccessLevel.READ
      );

      if (!writableCalendar) {
        console.warn("Nenhum calendário modificável encontrado.");
        return null;
      }

      return writableCalendar.id;
    } catch (error) {
      console.error("Erro ao obter calendário:", error);
      return null;
    }
  }

  static async createEvent(params: {
    title: string;
    startDate: Date;
    endDate: Date;
    location?: string;
    notes?: string;
  }): Promise<string | null> {
    try {
      console.log("Chamando getOrCreateCalendar");
      const calendarId = await this.getOrCreateCalendar();
      console.log("calendarId", calendarId);

      if (!calendarId) return null;

      const eventId = await Calendar.createEventAsync(calendarId, {
        title: params.title,
        startDate: params.startDate,
        endDate: params.endDate,
        timeZone: "America/Sao_Paulo",
        location: params.location,
        notes: params.notes,
      });

      console.log("Evento criado:", eventId);
      return eventId;
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      return null;
    }
  }
}
