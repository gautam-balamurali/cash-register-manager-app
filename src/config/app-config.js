/* eslint-disable */

const AVAILABLE_NOTES = [2000, 500, 100, 20, 10, 5, 1];

const NO_OF_EACH_AVAILABLE_NOTES = [];
AVAILABLE_NOTES.forEach((note) => NO_OF_EACH_AVAILABLE_NOTES.push(""));

const DEFAULT_CONSTANTS = {
  NEXT_BUTTON_ENABLED: true,
  NEXT_BUTTON_DISABLED: false,
  INVALID_INPUT_MESSAGE: "Input should be a valid number greater than 0.",
  INSUFFICIENT_CASH_MESSAGE: "Insufficient Cash! You know the drill!😡",
  EQUAL_AMOUNT_MESSAGE: "Thank you for giving the exact change. Have a nice day.🙂",
  RETURN_AMOUNT_MESSAGE: "Total amount to be returned: ",
  APP_DESCRIPTION:
    "Enter the bill amount and cash given by the customer and know minimum number of notes to return.",
};

export { AVAILABLE_NOTES, NO_OF_EACH_AVAILABLE_NOTES, DEFAULT_CONSTANTS };
