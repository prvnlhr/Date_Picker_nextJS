import React from "react";
import styles from "./styles/datePicker.module.scss";
import Preview from "../Preview/Preview";
import RecurrenceOptionsSelector from "../RecurrenceOptions/RecurrenceOptionsSelector";
const DatePicker = () => {
  return (
    <div className={styles.datePickerWrapper}>
      <div className={styles.selectorTabWrapper}></div>
      <Preview />
      <RecurrenceOptionsSelector />
      <div className={styles.btnWrapper}>
        <button>OK</button>
        <button>Clear</button>
      </div>
    </div>
  );
};

export default DatePicker;
