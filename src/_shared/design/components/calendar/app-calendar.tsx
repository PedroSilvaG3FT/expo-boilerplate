import { format, setMonth, setYear } from "date-fns";
import * as Haptics from "expo-haptics";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Calendar, CalendarProps } from "react-native-calendars";
import { Separator } from "../../ui/separator";
import AppView from "../app-view";
import AppCalendarControls from "./app-calendar-controls";

interface IProps extends CalendarProps {
  selectedDate: string;
}

export default function AppCalendar({ selectedDate, ...props }: IProps) {
  const selected = new Date(selectedDate);
  const currentMonth = selected.getMonth();
  const currentYear = selected.getFullYear();

  const updateMonth = (month: number) => {
    Haptics.selectionAsync();
    const newDate = setMonth(new Date(selectedDate), month);
    props.onDayPress?.({
      month: month + 1,
      day: newDate.getDate(),
      year: newDate.getFullYear(),
      timestamp: newDate.getTime(),
      dateString: format(newDate, "yyyy-MM-dd"),
    });
  };

  const updateYear = (year: number) => {
    Haptics.selectionAsync();
    const newDate = setYear(new Date(selectedDate), year);
    props.onDayPress?.({
      dateString: format(newDate, "yyyy-MM-dd"),
      day: newDate.getDate(),
      month: newDate.getMonth() + 1,
      year,
      timestamp: newDate.getTime(),
    } as any);
  };

  return (
    <AppView>
      <AppCalendarControls
        currentYear={currentYear}
        onChangeYear={updateYear}
        currentMonth={currentMonth}
        onChangeMonth={updateMonth}
      />

      <Separator className="my-6" />

      <Calendar
        {...props}
        key={selectedDate}
        current={selectedDate}
        enableSwipeMonths={true}
        onPressArrowRight={(addMonth) => addMonth()}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        renderArrow={(direction) =>
          direction === "left" ? <ChevronLeft /> : <ChevronRight />
        }
        markingType="custom"
        markedDates={{
          [selectedDate]: {
            customStyles: {
              container: {
                borderRadius: 8,
                backgroundColor: "#BEDBFE",
              },
              text: { color: "#3B81F6" },
            },
          },
        }}
        onMonthChange={(date) =>
          props.onDayPress?.({
            dateString: format(
              date.dateString ? new Date(date.dateString) : new Date(),
              "yyyy-MM-dd"
            ),
            day: 1,
            year: date.year,
            month: date.month,
            timestamp: new Date(date.dateString).getTime(),
          })
        }
      />
    </AppView>
  );
}
