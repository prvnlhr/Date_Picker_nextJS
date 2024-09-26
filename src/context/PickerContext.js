import React, { createContext, useContext, useState } from "react";

const PickerStateContext = createContext();

export const PickerStateProvider = ({ children }) => {
  const [pickerState, setPickerState] = useState({});

  return (
    <PickerStateContext.Provider value={{ pickerState, setPickerState }}>
      {children}
    </PickerStateContext.Provider>
  );
};

export const usePickerState = () => useContext(PickerStateContext);
