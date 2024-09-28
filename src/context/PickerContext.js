import React, { createContext, useContext, useEffect, useState } from "react";
import {
  RecurrenceOptionsEnum,
  CustomRecurrenceOptionsEnum,
  monthsArray,
  weekDaysArray,
} from "../lib/utils/constants";

import { capitalizeString, getSuffix } from "../lib/utils/helpers";

const PickerStateContext = createContext();

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDate = today.getDate();
const currentWeekday = today.getDay();

export const PickerStateProvider = ({ children }) => {
  const [activeMenuOption, setActiveMenuOption] = useState(null);

  const [calendarDateState, setCalendarDateState] = useState({
    calendarYear: currentYear,
    calendarMonth: currentMonth,

    selectedYear: currentYear,
    selectedMonth: currentMonth,
    selectedDate: currentDate,
    selectedWeekDay: currentWeekday,
  });

  const [recurrenceState, setRecurrenceState] = useState({
    recurrenceOption: null,
    customRecurrenceOption: null,
    selectedRecDates: [currentDate],
    selectedRecWeekDays: [currentWeekday],
    selectedRecMonth: currentMonth,
    selectedEventDates: [],
    seletedRecStatus: "",
  });

  const resetRecurrenceState = () => {
    setRecurrenceState({
      recurrenceOption: null,
      customRecurrenceOption: null,
      selectedRecDates: [currentDate],
      selectedRecWeekDays: [currentWeekday],
      selectedRecMonth: currentMonth,
      selectedEventDates: [],
      seletedRecStatus: "",
    });
  };

  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  const getCustomRecurrenceSelectedDates = () => {
    const today = new Date();
    const calendarDate = new Date(
      calendarDateState.selectedYear,
      calendarDateState.selectedMonth,
      calendarDateState.selectedDate
    );

    const { customRecurrenceOption, selectedRecDates, selectedRecWeekDays } =
      recurrenceState;
    const newSelectedDates = [];
    let recStatusString = "";

    switch (customRecurrenceOption) {
      case CustomRecurrenceOptionsEnum.DAY: {
        for (let i = 0; i < 365; i++) {
          const targetDate = new Date(calendarDate);
          targetDate.setDate(calendarDate.getDate() + i);

          if (targetDate > today) {
            newSelectedDates.push(targetDate);
          }
        }
        recStatusString = "Daily";
        break;
      }

      case CustomRecurrenceOptionsEnum.WEEK: {
        let currentDate = new Date(today);
        const weeksToCheck = 52;
        for (let i = 0; i < weeksToCheck * 7; i++) {
          const dayOfWeek = currentDate.getDay();
          if (selectedRecWeekDays.includes(dayOfWeek)) {
            newSelectedDates.push(new Date(currentDate));
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        const weeksStr = selectedRecWeekDays
          .map((w) => capitalizeString(weekDaysArray[w], 3))
          .join(", ");
        recStatusString = `Weekly on ${weeksStr}`;
        break;
      }

      case CustomRecurrenceOptionsEnum.MONTH: {
        const monthsToCheck = 12;
        let currentMonth = calendarDate.getMonth();
        let currentYear = calendarDate.getFullYear();
        for (let i = 0; i < monthsToCheck; i++) {
          selectedRecDates.forEach((recDate) => {
            const targetDate = new Date(currentYear, currentMonth, recDate);
            if (targetDate > today) {
              newSelectedDates.push(targetDate);
            }
          });
          currentMonth += 1;
          if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
          }
        }
        const datesStr = selectedRecDates
          .map((d) => `${d}${getSuffix(d)}`)
          .join(", ");
        recStatusString = `Monthly on ${datesStr}`;
        break;
      }

      case CustomRecurrenceOptionsEnum.YEAR: {
        const yearsToCheck = 5;
        const { selectedRecDates, selectedRecMonth } = recurrenceState;
        let currentYear = calendarDate.getFullYear();

        for (let i = 0; i < yearsToCheck; i++) {
          selectedRecDates.forEach((recDate) => {
            const targetDate = new Date(currentYear, selectedRecMonth, recDate);

            if (targetDate > today) {
              newSelectedDates.push(targetDate);
            }
          });
          currentYear += 1;
        }
        const datesStr = selectedRecDates
          .map((d) => `${d}${getSuffix(d)}`)
          .join(", ");
        recStatusString = `Yearly on ${capitalizeString(
          monthsArray[selectedRecMonth],
          3
        )} ${datesStr}`;
        break;
      }

      default: {
        console.warn(`Unknown recurrence option: ${customRecurrenceOption}`);
        break;
      }
    }
    setRecurrenceState((prev) => ({
      ...prev,
      selectedEventDates: newSelectedDates,
      seletedRecStatus: recStatusString,
    }));
  };

  const getRecurrenceSelectedDates = () => {
    const today = new Date();
    const calendarDate = new Date(
      calendarDateState.selectedYear,
      calendarDateState.selectedMonth,
      calendarDateState.selectedDate
    );

    const { recurrenceOption, selectedRecDates, selectedRecWeekDays } =
      recurrenceState;
    const newSelectedDates = [];
    let recStatusString = "";
    switch (recurrenceOption) {
      case RecurrenceOptionsEnum.DAILY: {
        for (let i = 0; i < 365; i++) {
          const targetDate = new Date(calendarDate);
          targetDate.setDate(calendarDate.getDate() + i);

          if (targetDate > today) {
            newSelectedDates.push(targetDate);
          }
        }

        recStatusString = "Daily";
        break;
      }

      case RecurrenceOptionsEnum.WEEKLY: {
        let currentDate = new Date(today);
        const weeksToCheck = 52;
        for (let i = 0; i < weeksToCheck * 7; i++) {
          const dayOfWeek = currentDate.getDay();
          if (selectedRecWeekDays.includes(dayOfWeek)) {
            newSelectedDates.push(new Date(currentDate));
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        const weeksStr = selectedRecWeekDays
          .map((w) => capitalizeString(weekDaysArray[w], 3))
          .join(", ");
        recStatusString = `Weekly on ${weeksStr}`;
        break;
      }

      case RecurrenceOptionsEnum.MONTHLY: {
        const monthsToCheck = 12;
        let currentMonth = calendarDate.getMonth();
        let currentYear = calendarDate.getFullYear();
        for (let i = 0; i < monthsToCheck; i++) {
          selectedRecDates.forEach((recDate) => {
            const targetDate = new Date(currentYear, currentMonth, recDate);
            if (targetDate > today) {
              newSelectedDates.push(targetDate);
            }
          });
          currentMonth += 1;
          if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
          }
        }

        const datesStr = selectedRecDates
          .map((d) => `${d}${getSuffix(d)}`)
          .join(", ");

        recStatusString = `Monthly on ${datesStr}`;

        break;
      }

      case RecurrenceOptionsEnum.YEARLY: {
        const yearsToCheck = 5;
        const { selectedRecDates, selectedRecMonth } = recurrenceState;
        let currentYear = calendarDate.getFullYear();

        for (let i = 0; i < yearsToCheck; i++) {
          selectedRecDates.forEach((recDate) => {
            const targetDate = new Date(currentYear, selectedRecMonth, recDate);

            if (targetDate > today) {
              newSelectedDates.push(targetDate);
            }
          });
          currentYear += 1;
        }
        const datesStr = selectedRecDates
          .map((d) => `${d}${getSuffix(d)}`)
          .join(", ");
        recStatusString = `Yearly on ${capitalizeString(
          monthsArray[selectedRecMonth],
          3
        )} ${datesStr}`;
        break;
      }

      default: {
        console.warn(`Unknown recurrence option: ${recurrenceOption}`);
        break;
      }
    }
    setRecurrenceState((prev) => ({
      ...prev,
      selectedEventDates: newSelectedDates,
      seletedRecStatus: recStatusString,
    }));
  };

  // ---------------------------------------------------------------------------
  const getWeekDay = (year, month, date) => {
    return new Date(year, month, date).getDay();
  };

  const updateRecState = (calendarState) => {
    setRecurrenceState((prev) => ({
      ...prev,
      selectedRecDates: [calendarState.selectedDate],
      selectedRecWeekDays: [calendarState.selectedWeekDay],
      selectedRecMonth: calendarState.selectedMonth,
    }));
  };

  const updateCalendarState = (newState) => {
    setCalendarDateState((prev) => {
      const updatedState = { ...prev, ...newState };

      const updatedWeekDay = getWeekDay(
        updatedState.selectedYear,
        updatedState.selectedMonth,
        updatedState.selectedDate
      );

      const newCalendarState = {
        ...updatedState,
        selectedWeekDay: updatedWeekDay,
      };

      updateRecState(newCalendarState);
      return newCalendarState;
    });
  };

  const updateCalendarYear = (year) => {
    updateCalendarState({ calendarYear: year });
  };

  const updateCalendarMonth = (month) => {
    updateCalendarState({ calendarMonth: month });
  };

  const updateCalendarDate = (date) => {
    updateCalendarState({
      selectedDate: date,
      selectedMonth: calendarDateState.calendarMonth,
      selectedYear: calendarDateState.calendarYear,
    });
  };

  const resetCalendarToTodayDate = () => {
    setCalendarDateState((prev) => ({
      ...prev,
      calendarYear: currentYear,
      calendarMonth: currentMonth,
      selectedDate: currentDate,
    }));
  };

  const toggleMonth = (val) => {
    setCalendarDateState((prev) => {
      let newMonth = prev.calendarMonth + val;
      let newYear = prev.calendarYear;
      if (newMonth > 11) {
        newYear += 1;
        newMonth = 0;
      } else if (newMonth < 0) {
        newYear -= 1;
        newMonth = 11;
      }
      const updatedWeekDay = getWeekDay(newYear, newMonth, prev.selectedDate);
      return {
        ...prev,
        calendarMonth: newMonth,
        calendarYear: newYear,
        selectedWeekDay: updatedWeekDay,
      };
    });
  };

  // ---------------------------------------------------------------------------

  const handleMenuOptionClicked = (menuIndex) => {
    setActiveMenuOption((prev) => (prev === menuIndex ? null : menuIndex));
  };

  const handleRecOptionChanged = (option) => {
    setRecurrenceState((prev) => ({
      ...prev,
      recurrenceOption: option,
    }));
    if (option === RecurrenceOptionsEnum.CUSTOM) {
      setRecurrenceState((prev) => ({
        ...prev,
        customRecurrenceOption: CustomRecurrenceOptionsEnum.DAY,
      }));
    }
  };

  const handleCustomRecOptionChange = (customOption) => {
    setRecurrenceState((prev) => ({
      ...prev,
      customRecurrenceOption: customOption,
    }));
  };

  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (
      recurrenceState.recurrenceOption !== null &&
      recurrenceState.recurrenceOption !== RecurrenceOptionsEnum.CUSTOM
    ) {
      getRecurrenceSelectedDates();
    }
  }, [recurrenceState.recurrenceOption, calendarDateState.selectedDate]);

  // ---------------------------------------------------------------------------

  return (
    <PickerStateContext.Provider
      value={{
        activeMenuOption,
        setActiveMenuOption,
        handleMenuOptionClicked,

        handleRecOptionChanged,
        handleCustomRecOptionChange,

        toggleMonth,
        resetCalendarToTodayDate,
        updateCalendarMonth,
        updateCalendarYear,
        updateCalendarDate,

        calendarDateState,
        recurrenceState,
        setRecurrenceState,
        getRecurrenceSelectedDates,
        getCustomRecurrenceSelectedDates,
        resetRecurrenceState,
      }}
    >
      {children}
    </PickerStateContext.Provider>
  );
};

export const usePickerState = () => useContext(PickerStateContext);
