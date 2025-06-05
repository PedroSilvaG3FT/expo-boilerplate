import AppText from "@/_shared/design/components/app-text";
import AppView from "@/_shared/design/components/app-view";
import AppCalendar from "@/_shared/design/components/calendar/app-calendar";

export default function CalendarExample() {
  return (
    <AppView>
      <AppText>Calendar</AppText>
      <AppCalendar
        onDayPress={(day) => console.log("selected day", day)}
        onDayLongPress={(day) => console.log("selected day", day)}
        onMonthChange={(month) => console.log("month changed", month)}
      />
    </AppView>
  );
}
