"use client";

import { PickerStateProvider } from "@/context/PickerContext";

export const CombinedProviders = ({ children }) => {
  return <PickerStateProvider>{children}</PickerStateProvider>;
};
