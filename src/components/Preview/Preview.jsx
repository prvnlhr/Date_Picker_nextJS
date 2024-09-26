import React from "react";
import styles from "./styles/preview.module.scss";
import Calendar from "./Calendar";

const Preview = () => {
  return (
    <div className={styles.previewWrapper}>
      <Calendar />
    </div>
  );
};

export default Preview;
