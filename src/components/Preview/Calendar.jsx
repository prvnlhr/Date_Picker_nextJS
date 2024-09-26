"use client";
import React, { useState } from "react";
import styles from "./styles/calendar.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  const [viewType, setViewType] = useState("calendar");

  const handleViewChange = (view) => {
    setViewType(view);
  };
  return (
    <div className={styles.calenderGrid}>
      <div className={styles.navigationControlWrapper}>
        <div className={styles.dateDisplayWrapper}>
          <button type="button" onClick={() => handleViewChange("month")}>
            September
          </button>
          <button type="button" onClick={() => handleViewChange("year")}>
            2024
          </button>
        </div>
        <div className={styles.monthToggleWrapper}>
          <button type="button" className={styles.monthToggleBtn}>
            <Icon
              icon="heroicons-outline:chevron-left"
              style={{ color: "white" }}
            />
          </button>
          <button type="button" className={styles.monthToggleBtn}>
            <Icon
              icon="heroicons-outline:chevron-right"
              style={{ color: "white" }}
            />
          </button>
        </div>
      </div>
      <div className={styles.calendarInnerWrapper}>
        {viewType === "month" ? (
          <div className={styles.monthsList}>
            {monthsArray.map((month) => (
              <div className={styles.monthCell}>
                <p>{month.slice(0, 3)}</p>
              </div>
            ))}
          </div>
        ) : viewType === "year" ? (
          <div className={styles.yearsList}>
            {Array.from({ length: 2050 - 1900 + 1 }, (_, index) => {
              const year = 1900 + index;
              return (
                <div key={year} className={styles.yearCell}>
                  <p>{year}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <React.Fragment>
            <div className={styles.weekHeaderWrapper}>
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                <div key={day} className={styles.weekTextWrapper}>
                  <p>{day}</p>
                </div>
              ))}
            </div>
            <div className={styles.dateCellsWrapper}>
              {Array.from({ length: 31 }).map((_, date) => (
                <div key={date} className={styles.dateCell}>
                  <div className={styles.dateCell__innerWrapper}>
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
