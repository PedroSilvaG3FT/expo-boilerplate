import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import AppCalendar from "@/_shared/design/components/calendar/app-calendar";
import { Button, ButtonText } from "@/_shared/design/ui/button";
import { CalendarHelper } from "@/_shared/helpers/calendar.helper";
import { addHours, format, parseISO } from "date-fns";
import { useState } from "react";
import { Alert } from "react-native";

export default function CalendarExample() {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  const handleAddEvent = async () => {
    const startDate = parseISO(selectedDate);
    const endDate = addHours(startDate, 1);

    console.log("ADD ", startDate);
    const eventId = await CalendarHelper.createEvent({
      title: "Evento de Teste",
      startDate,
      endDate,
      location: "Local Exemplo",
      notes: "Este é um evento mock criado para testar o calendário.",
    });

    if (eventId) {
      Alert.alert("Sucesso", "Evento criado com sucesso no calendário!");
    } else {
      Alert.alert("Erro", "Não foi possível criar o evento.");
    }
  };

  return (
    <AppView>
      <AppText type="subtitle">Calendar</AppText>
      <AppText className="my-6">Value: {selectedDate}</AppText>

      <AppCalendar
        selectedDate={selectedDate}
        onDayPress={(data) => setSelectedDate(data.dateString)}
      />

      <Button onPress={handleAddEvent}>
        <ButtonText>Add Event</ButtonText>
      </Button>
    </AppView>
  );
}
