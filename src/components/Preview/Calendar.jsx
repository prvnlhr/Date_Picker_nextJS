"use client";
import React, { useState } from "react";
import styles from "./styles/calendar.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import moment from "moment";
import { usePickerState } from "@/context/PickerContext";

import {
  ViewTypeEnum,
  weekDaysArray,
  monthsArray,
} from "../../lib/utils/constants.js";
import { capitalizeString } from "../../lib/utils/helpers.js";

const Calendar = () => {
  const [viewType, setViewType] = useState(ViewTypeEnum.DATE);

  const {
    calendarDateState: {
      calendarMonth,
      calendarYear,
      selectedDate,
      selectedMonth,
      selectedYear,
    },

    toggleMonth,
    resetCalendarToTodayDate,
    updateCalendarYear,
    updateCalendarMonth,
    updateCalendarDate,
    recurrenceState: { selectedEventDates },
  } = usePickerState();

  const handleCalendarViewChange = (view) => {
    setViewType((prev) => (prev === view ? ViewTypeEnum.DATE : view));
  };

  const handleCalenderResetBtnClicked = () => {
    resetCalendarToTodayDate();
    setViewType(ViewTypeEnum.DATE);
  };

  const handleChangeMonth = (month) => {
    updateCalendarMonth(month);
    setViewType(ViewTypeEnum.DATE);
  };
  const handleChangeYear = (year) => {
    updateCalendarYear(year);
    setViewType(ViewTypeEnum.DATE);
  };

  const handleChangeDate = (date) => {
    updateCalendarDate(date);
  };

  const momentDate = moment().year(calendarYear).month(calendarMonth);
  const startOfMonthDayIndex = momentDate.startOf("month").day();
  const daysInMonth = momentDate.daysInMonth();

  const today = moment();
  const currentYear = today.year();
  const currentMonth = today.month();
  const currentDate = today.date();

  const isTodayDate = (date) => {
    return (
      calendarMonth === currentMonth &&
      calendarYear === currentYear &&
      date === currentDate
    );
  };

  const isDateSelected = (date, month, year) => {
    return (
      date === selectedDate && month === calendarMonth && year === calendarYear
    );
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  const isDateEventSelected = (date) => {
    let fullDate = new Date(calendarYear, calendarMonth, date);
    const formattedDateToCheck = formatDate(fullDate);
    const eventDates = selectedEventDates;
    return eventDates.some((d) => {
      return formatDate(d) === formattedDateToCheck;
    });
  };

  return (
    <div className={styles.calenderGrid}>
      <div className={styles.navigationControlWrapper}>
        <div className={styles.dateDisplayWrapper}>
          {/*-------------- Month Selector Buttons ----------------------------------------------------------------------- */}
          <button
            type="button"
            onClick={() => handleCalendarViewChange(ViewTypeEnum.MONTH)}
          >
            {capitalizeString(monthsArray[calendarMonth])}
          </button>
          {/*-------------- Year Selector Buttons ----------------------------------------------------------------------- */}
          <button
            type="button"
            onClick={() => handleCalendarViewChange(ViewTypeEnum.YEAR)}
          >
            {calendarYear}
          </button>
        </div>

        {/*-------------- Month toggle Buttons ----------------------------------------------------------------------- */}
        <div className={styles.monthToggleWrapper}>
          <button
            type="button"
            className={styles.monthToggleBtn}
            onClick={() => toggleMonth(-1)}
          >
            <Icon
              icon="heroicons-outline:chevron-left"
              style={{ color: "white" }}
            />
          </button>
          <button
            className={styles.todayDateBtn}
            onClick={handleCalenderResetBtnClicked}
            type="button"
          ></button>
          <button
            type="button"
            className={styles.monthToggleBtn}
            onClick={() => toggleMonth(1)}
          >
            <Icon
              icon="heroicons-outline:chevron-right"
              style={{ color: "white" }}
            />
          </button>
        </div>
      </div>
      <div className={styles.calendarInnerWrapper}>
        {viewType === ViewTypeEnum.MONTH ? (
          <div className={styles.monthsList}>
            {/*-------------- Rendering months [Jan - Dec]----------------------------------------------------------------------- */}
            {monthsArray.map((month, index) => (
              <div
                key={month}
                className={`${styles.monthCell} ${
                  calendarMonth === index && styles["monthCell--selected"]
                }`}
                onClick={() => handleChangeMonth(index)}
              >
                <p>{month.slice(0, 3)}</p>
              </div>
            ))}
          </div>
        ) : viewType === ViewTypeEnum.YEAR ? (
          <div className={styles.yearsList}>
            {/*-------------- Rendering Years from [1900 - 2050] ----------------------------------------------------------------------- */}
            {Array.from({ length: 2050 - 1900 + 1 }, (_, index) => {
              const year = 1900 + index;
              return (
                <div
                  key={year}
                  className={`${styles.yearCell} ${
                    2024 === year && styles["yearCell--selected"]
                  }`}
                  onClick={() => handleChangeYear(year)}
                >
                  <p>{year}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <React.Fragment>
            {/*------------- Rendering Week Days ----------------------------------------------------------------------- */}
            <div className={styles.weekHeaderWrapper}>
              {weekDaysArray.map((day) => (
                <div key={day} className={styles.weekTextWrapper}>
                  <p>{day.slice(0, 3)}</p>
                </div>
              ))}
            </div>
            {/* ------------ Rendering Dates Days ----------------------------------------------------------------------- */}
            <div className={styles.dateCellsWrapper}>
              {Array.from({ length: startOfMonthDayIndex }).map((_, index) => (
                <div key={index} className={styles.dateCell}></div>
              ))}
              {Array.from({ length: daysInMonth }).map((_, date) => (
                <div key={date} className={styles.dateCell}>
                  <div
                    onClick={() => handleChangeDate(date + 1)}
                    className={`
                  ${styles.dateCell__innerWrapper}
                  ${
                    isTodayDate(date + 1) &&
                    styles["dateCell__innerWrapper--todaysDateHighlight"]
                  } 
                  ${
                    isDateSelected(date + 1, selectedMonth, selectedYear) &&
                    styles["dateCell__innerWrapper--selected"]
                  } 
                  ${
                    isDateEventSelected(date + 1) &&
                    styles["dateCell__innerWrapper--highlighted"]
                  }  
                  `}
                  >
                    <p>{date + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Calendar;
