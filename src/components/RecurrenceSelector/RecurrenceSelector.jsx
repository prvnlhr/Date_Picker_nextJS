"use client";
import React from "react";
import styles from "./styles/recurrenceOptionsSelector.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
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
    resetRecurrenceState,
  } = usePickerState();

  const clearSelection = () => {
    resetRecurrenceState();
  };

  return (
    <div className={styles.mainListWrapper}>
      {menuOptions.map((option, optIndex) => (
        <React.Fragment key={optIndex}>
          <div
            className={styles.optionWrapper}
            onClick={() => handleMenuOptionClicked(optIndex)}
          >
            <p>{option.label}</p>
            <p className={styles.statusText}>{seletedRecStatus}</p>
            {seletedRecStatus && (
              <Icon
                icon="radix-icons:cross-2"
                style={{ color: "white" }}
                onClick={(event) => {
                  event.stopPropagation();
                  clearSelection();
                }}
              />
            )}
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
  );
};

export default RecurrenceSelector;
