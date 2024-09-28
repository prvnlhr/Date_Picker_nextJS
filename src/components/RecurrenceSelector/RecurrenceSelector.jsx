"use client";
import React from "react";
import styles from "./styles/recurrenceOptionsSelector.module.scss";
import CustomRecurrenceSelector from "./CustomRecurrenceSelector";
import { usePickerState } from "@/context/PickerContext";
import { RecurrenceOptionsEnum } from "../../lib/utils/constants.js";

const menuOptions = [
  {
    label: "Repeat",
    recurrenceOptions: [
      { label: "Daily", value: RecurrenceOptionsEnum.DAILY },
      { label: "Weekly", value: RecurrenceOptionsEnum.WEEKLY },
      { label: "Monthly", value: RecurrenceOptionsEnum.MONTHLY },
      { label: "Yearly", value: RecurrenceOptionsEnum.YEARLY },
      { label: "Custom", value: RecurrenceOptionsEnum.CUSTOM },
    ],
  },
];

const RecurrenceSelector = () => {
  const {
    activeMenuOption,
    handleRecOptionChanged,
    handleMenuOptionClicked,
    recurrenceState: { recurrenceOption, seletedRecStatus },
  } = usePickerState();

  //   let str = "";
  //   switch (recurrenceOption) {
  //     case RecurrenceOptionsEnum.DAILY:
  //       str = "Daily";
  //       break;

  //     case RecurrenceOptionsEnum.WEEKLY:
  //       const weeks = selectedRecWeekDays
  //         .map((week) => capitalizeString(weekDaysArray[week].slice(0, 3)))
  //         .join(",");
  //       str = `Weekly on (${weeks})`;
  //       break;

  //     case RecurrenceOptionsEnum.MONTHLY:
  //       const dates = selectedRecDates.join(",");
  //       str = `Monthly on (${dates})`;
  //       break;

  //     case RecurrenceOptionsEnum.YEARLY:
  //       {
  //         const dates = selectedRecDates.join(",");
  //         str = `Yearly on ${monthsArray[selectedRecMonth].slice(
  //           0,
  //           3
  //         )} ${dates}`;
  //       }
  //       break;

  //     case RecurrenceOptionsEnum.CUSTOM:
  //       switch (customRecurrenceOption) {
  //         case CustomRecurrenceOptionsEnum.DAY:
  //           str = "Daily";
  //           break;
  //         case CustomRecurrenceOptionsEnum.WEEK:
  //           const weeks = selectedRecWeekDays
  //             .map((week) => capitalizeString(weekDaysArray[week].slice(0, 3)))
  //             .join(",");
  //           str = `Weekly on (${weeks})`;
  //           break;
  //         case CustomRecurrenceOptionsEnum.MONTH:
  //           const dates = selectedRecDates.join(",");
  //           str = `Monthly on (${dates})`;
  //           break;
  //         case CustomRecurrenceOptionsEnum.YEAR:
  //           {
  //             const dates = selectedRecDates.join(",");
  //             str = `Yearly on ${monthsArray[selectedRecMonth].slice(
  //               0,
  //               3
  //             )} ${dates}`;
  //           }
  //           break;

  //         default:
  //           break;
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  //   return str;
  // };

  return (
    <div className={styles.list}>
      <div className={styles.mainListWrapper}>
        {menuOptions.map((option, optIndex) => (
          <React.Fragment key={optIndex}>
            <div
              className={styles.optionWrapper}
              onClick={() => handleMenuOptionClicked(optIndex)}
            >
              <p>{option.label}</p>
              <p>{seletedRecStatus}</p>
            </div>

            {recurrenceOption === RecurrenceOptionsEnum.CUSTOM ? (
              <CustomRecurrenceSelector />
            ) : (
              <div
                className={styles.subListWrapper}
                style={{
                  height:
                    activeMenuOption === optIndex
                      ? `${option.recurrenceOptions.length * 30}px`
                      : "0px",
                }}
              >
                {option.recurrenceOptions.map((recOpt) => (
                  <div
                    key={recOpt.value}
                    className={`${styles.subOptionWrapper} ${
                      recurrenceOption === recOpt.value &&
                      styles["subOptionWrapper--selected"]
                    }`}
                    onClick={() => handleRecOptionChanged(recOpt.value)}
                  >
                    <p>{recOpt.label}</p>
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

export default RecurrenceSelector;
