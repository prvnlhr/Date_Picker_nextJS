import React from "react";
import styles from "./styles/datePicker.module.scss";
import Preview from "../Preview/Preview";
import RecurrenceSelector from "../RecurrenceSelector/RecurrenceSelector";

const DatePicker = () => {
  return (
    <div className={styles.datePickerWrapper}>
      <div className={styles.selectorTabWrapper}></div>
      <Preview />
      <RecurrenceSelector />
      {/* <div className={styles.btnWrapper}>
        <button type="button" onClick={handleOkBtnClicked}>
          OK
        </button>
        <button type="button" onClick={handleClearBtnClicked}>
          Clear
        </button>
      </div> */}
    </div>
  );
};

export default DatePicker;
