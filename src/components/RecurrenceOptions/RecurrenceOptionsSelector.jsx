"use client";
import React, { useState } from "react";
import styles from "./styles/recurrenceOptionsSelector.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";

const mainList = [
  {
    text: "Repeat",
    options: [
      { text: "Daily" },
      { text: "Weekly (Thu)" },
      { text: "Monthly (26th)" },
      { text: "Yearly (Sept 26)" },
      { text: "Custom" },
    ],
  },
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CustomDaySelector = () => {
  return <div className={styles.customSelectorWrapper}></div>;
};
const CustomWeekSelector = () => {
  return (
    <div className={styles.customSelectorWrapper}>
      <div className={styles.weekCellsWrapper}>
        {weekDays.map((day) => (
          <div className={styles.weekDayCell}>
            <p>{day[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
const CommonMonthYearSelector = ({ showMonthToggle }) => {
  return (
    <div className={styles.commonMonthYearSelectorWrapper}>
      {showMonthToggle && (
        <div className={styles.headerWrapper}>
          <div className={styles.monthDisplayWrapper}>
            <p>Sept</p>
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
      )}
      <div className={styles.dateCellGrid}>
        {Array.from({ length: 31 }).map((_, date) => (
          <div className={styles.dateCell}>
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

const RecurrenceOptionsSelector = () => {
  const [activeOption, setActiveOption] = useState(null);
  const [recurrencePattern, setRecurrencePattern] = useState(null);
  const [customRecurrencePattern, setCustomRecurrencePattern] = useState(0);

  const handleOptionClicked = (indx) => {
    setActiveOption((prev) => {
      if (prev === indx) {
        setRecurrencePattern(null);
        return null;
      } else {
        return indx;
      }
    });
  };
  const handleRecClicked = (index) => {
    setRecurrencePattern(index);
    if (index !== 4) {
      setActiveOption(null);
    }
  };
  const handleCustomRecChange = (e) => {
    setCustomRecurrencePattern(+e.target.value);
  };

  return (
    <div className={styles.list}>
      <div className={styles.mainListWrapper}>
        {mainList.map((option, index) => (
          <React.Fragment key={index}>
            <div
              className={styles.optionWrapper}
              onClick={() => handleOptionClicked(index)}
            >
              <p>{option.text}</p>
            </div>

            {recurrencePattern === 4 ? (
              <div className={styles.customRecWrapper}>
                <div
                  className={styles.customRecWrapper__everyInputWrapper}
                ></div>
                <div
                  className={styles.customRecWrapper__customRecDropDownWrapper}
                >
                  <select
                    id="recurrence"
                    className={styles.dropSelect}
                    onChange={handleCustomRecChange}
                    value={customRecurrencePattern}
                  >
                    <option value={0}>Day</option>
                    <option value={1}>Week</option>
                    <option value={2}>Month</option>
                    <option value={3}>Year</option>
                  </select>
                </div>
                <div
                  className={`${styles.customRecWrapper__selectorWrapper} ${
                    styles[
                      `customRecWrapper__selectorWrapper${customRecurrencePattern}`
                    ]
                  }`}
                >
                  {customRecurrencePattern === 0 && <CustomDaySelector />}
                  {customRecurrencePattern === 1 && <CustomWeekSelector />}
                  {customRecurrencePattern === 2 && <CustomMonthSelector />}
                  {customRecurrencePattern === 3 && <CustomYearSelector />}
                </div>
              </div>
            ) : (
              <div
                className={styles.subListWrapper}
                style={{
                  height:
                    activeOption === index
                      ? `${option.options.length * 30}px`
                      : "0px",
                }}
              >
                {option.options.map((subOption, subIndex) => (
                  <div
                    key={subIndex}
                    className={styles.subOptionWrapper}
                    onClick={() => handleRecClicked(subIndex)}
                  >
                    <p>{subOption.text}</p>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RecurrenceOptionsSelector;
