import React from "react";
import moment from "moment";
import styles from "./styles/customRecSelector.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import { usePickerState } from "@/context/PickerContext";
import {
  CustomRecurrenceOptionsEnum,
  weekDaysArray,
  monthsArray,
  DayEnum,
} from "../../lib/utils/constants.js";

import { capitalizeString } from "../../lib/utils/helpers.js";

const CustomDaySelector = () => {
  return <div className={styles.customSelectorWrapper}></div>;
};

const CustomWeekSelector = () => {
  const {
    recurrenceState: { selectedRecWeekDays },
    setRecurrenceState,
  } = usePickerState();

  const handleWeekCellClicked = (week) => {
    const updatedSelectedWeeks = selectedRecWeekDays.includes(week)
      ? selectedRecWeekDays.filter((w) => w !== week)
      : [...selectedRecWeekDays, week];
    setRecurrenceState((prev) => ({
      ...prev,
      selectedRecWeekDays: updatedSelectedWeeks,
    }));
  };

  const isSelectedWeek = (val) => {
    return selectedRecWeekDays.includes(val);
  };

  return (
    <div className={styles.customSelectorWrapper}>
      <div className={styles.weekCellsWrapper}>
        {weekDaysArray.map((day) => (
          <div
            className={`${styles.weekDayCell} ${
              isSelectedWeek(DayEnum[day]) && styles["weekDayCell--selected"]
            }`}
            key={day}
            onClick={() => handleWeekCellClicked(DayEnum[day])}
          >
            <p>{day[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommonMonthYearSelector = ({ showMonthToggle }) => {
  const {
    recurrenceState: {
      selectedRecDates,
      selectedRecMonth,
      customRecurrenceOption,
    },
    setRecurrenceState,

    calendarDateState: { calendarYear },
  } = usePickerState();

  const momentDate = moment().year(calendarYear).month(selectedRecMonth);
  const startOfMonthDayIndex = momentDate.startOf("month").day();
  const daysInMonth =
    customRecurrenceOption === CustomRecurrenceOptionsEnum.MONTH
      ? 31
      : momentDate.daysInMonth();

  const handleDateCellClicked = (date) => {
    if (customRecurrenceOption === CustomRecurrenceOptionsEnum.YEAR) {
      setRecurrenceState((prev) => ({
        ...prev,
        selectedRecDates: [date],
      }));
    } else {
      const updatedSelectedDate = selectedRecDates.includes(date)
        ? selectedRecDates.filter((d) => d !== date)
        : [...selectedRecDates, date];
      setRecurrenceState((prev) => ({
        ...prev,
        selectedRecDates: updatedSelectedDate,
      }));
    }
  };

  const toggleRecMonth = (val) => {
    setRecurrenceState((prev) => {
      let newMonth = prev.selectedRecMonth + val;
      if (newMonth > 11) {
        newMonth = 0;
      } else if (newMonth < 0) {
        newMonth = 11;
      }
      return {
        ...prev,
        selectedRecMonth: newMonth,
      };
    });
  };

  const isDateSelected = (val) => {
    return selectedRecDates.includes(val);
  };

  return (
    <div className={styles.commonMonthYearSelectorWrapper}>
      {showMonthToggle && (
        <div className={styles.headerWrapper}>
          <div className={styles.monthDisplayWrapper}>
            <p>{capitalizeString(monthsArray[selectedRecMonth])}</p>
          </div>
          <div className={styles.monthToggleWrapper}>
            <button
              type="button"
              className={styles.monthToggleBtn}
              onClick={() => toggleRecMonth(-1)}
            >
              <Icon
                icon="heroicons-outline:chevron-left"
                style={{ color: "white" }}
              />
            </button>
            <button
              type="button"
              className={styles.monthToggleBtn}
              onClick={() => toggleRecMonth(1)}
            >
              <Icon
                icon="heroicons-outline:chevron-right"
                style={{ color: "white" }}
              />
            </button>
          </div>
        </div>
      )}
      <div className={styles.dateCellGrid}>
        {Array.from({ length: daysInMonth }).map((_, date) => (
          <div
            className={`${styles.dateCell} ${
              isDateSelected(date + 1) && styles["dateCell--selected"]
            }`}
            key={date}
            onClick={() => handleDateCellClicked(date + 1)}
          >
            <p>{date + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomMonthSelector = () => {
  return (
    <div className={styles.customSelectorWrapper}>
      <CommonMonthYearSelector showMonthToggle={false} />
    </div>
  );
};

const CustomYearSelector = () => {
  return (
    <div className={styles.customSelectorWrapper}>
      <CommonMonthYearSelector showMonthToggle={true} />
    </div>
  );
};

const CustomRecurrenceSelector = () => {
  const {
    setActiveMenuOption,
    handleCustomRecOptionChange,
    recurrenceState: { customRecurrenceOption },
    setRecurrenceState,
    getCustomRecurrenceSelectedDates,
  } = usePickerState();

  const handleConfirmBtnClicked = () => {
    getCustomRecurrenceSelectedDates();
    setRecurrenceState((prev) => ({
      ...prev,
      recurrenceOption: null,
    }));
    setActiveMenuOption(null);
  };

  const handleCancelBtnClicked = () => {
    setRecurrenceState((prev) => ({
      ...prev,
      recurrenceOption: null,
    }));
  };

  return (
    <div className={styles.customRecWrapper}>
      <div className={styles.customRecWrapper__everyInputWrapper}></div>
      <div className={styles.customRecWrapper__customRecDropDownWrapper}>
        <select
          id="recurrence"
          className={styles.dropSelect}
          onChange={(e) => handleCustomRecOptionChange(e.target.value)}
          value={customRecurrenceOption || ""}
        >
          <option value={CustomRecurrenceOptionsEnum.DAY}>Day</option>
          <option value={CustomRecurrenceOptionsEnum.WEEK}>Week</option>
          <option value={CustomRecurrenceOptionsEnum.MONTH}>Month</option>
          <option value={CustomRecurrenceOptionsEnum.YEAR}>Year</option>
        </select>
      </div>
      <div
        className={`${styles.customRecWrapper__selectorWrapper} ${
          styles[`customRecWrapper__selectorWrapper${customRecurrenceOption}`]
        }`}
      >
        {customRecurrenceOption === CustomRecurrenceOptionsEnum.DAY && (
          <CustomDaySelector />
        )}
        {customRecurrenceOption === CustomRecurrenceOptionsEnum.WEEK && (
          <CustomWeekSelector />
        )}
        {customRecurrenceOption === CustomRecurrenceOptionsEnum.MONTH && (
          <CustomMonthSelector />
        )}
        {customRecurrenceOption === CustomRecurrenceOptionsEnum.YEAR && (
          <CustomYearSelector />
        )}
      </div>
      <div className={styles.customRecWrapper__confirmBtnWrapper}>
        <button type="submit" onClick={handleConfirmBtnClicked}>
          OK
        </button>
        <button type="submit" onClick={handleCancelBtnClicked}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CustomRecurrenceSelector;
