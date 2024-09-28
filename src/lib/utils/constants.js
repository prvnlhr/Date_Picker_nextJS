export const DayEnum = Object.freeze({
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
});

export const weekDaysArray = Object.keys(DayEnum);

export const MonthEnum = Object.freeze({
  JANUARY: 0,
  FEBRUARY: 1,
  MARCH: 2,
  APRIL: 3,
  MAY: 4,
  JUNE: 5,
  JULY: 6,
  AUGUST: 7,
  SEPTEMBER: 8,
  OCTOBER: 9,
  NOVEMBER: 10,
  DECEMBER: 11,
});

export const monthsArray = Object.keys(MonthEnum);

export const RecurrenceOptionsEnum = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
  CUSTOM: "CUSTOM",
};

export const CustomRecurrenceOptionsEnum = {
  DAY: "0",
  WEEK: "1",
  MONTH: "2",
  YEAR: "3",
};


export const ViewTypeEnum = {
    DATE: "DATE",
    YEAR: "YEAR",
    MONTH: "MONTH",
    WEEK: "WEEK",
  };