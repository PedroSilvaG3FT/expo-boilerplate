import { format, setMonth, setYear } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useState } from "react";
import { Calendar, CalendarProps } from "react-native-calendars";
import { Separator } from "../../ui/separator";
import AppView from "../app-view";
import AppCalendarControls from "./app-calendar-controls";

interface IProps extends CalendarProps {}

export default function AppCalendar(props: IProps) {
  const [currentDate, setCurrentDate] = useState(
    props.initialDate || format(new Date(), "yyyy-MM-dd")
  );

  const selectedDate = new Date(currentDate);
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const updateMonth = (month: number) => {
    const newDate = setMonth(new Date(currentDate), month);
    setCurrentDate(format(newDate, "yyyy-MM-dd"));
  };

  const updateYear = (year: number) => {
    const newDate = setYear(new Date(currentDate), year);
    setCurrentDate(format(newDate, "yyyy-MM-dd"));
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
        key={currentDate}
        current={currentDate}
        enableSwipeMonths={true}
        onPressArrowRight={(addMonth) => addMonth()}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        renderArrow={(direction) =>
          direction === "left" ? <ChevronLeft /> : <ChevronRight />
        }
        onMonthChange={(date) =>
          setCurrentDate(
            format(
              date.dateString ? new Date(date.dateString) : new Date(),
              "yyyy-MM-dd"
            )
          )
        }
      />
    </AppView>
  );
}
