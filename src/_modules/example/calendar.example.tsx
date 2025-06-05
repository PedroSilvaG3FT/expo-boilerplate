import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import AppCalendar from "@/_shared/design/components/calendar/app-calendar";
import { format } from "date-fns";
import { useState } from "react";

export default function CalendarExample() {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  return (
    <AppView>
      <AppText type="subtitle">Calendar</AppText>
      <AppText className="my-6">Value: {selectedDate}</AppText>

      <AppCalendar
        selectedDate={selectedDate}
        onDayPress={(data) => setSelectedDate(data.dateString)}
      />
    </AppView>
  );
}
