/* eslint-disable */

import React from "react";
import * as AppConstants from "../../../config/app-config";
import { useState } from "react";
import {
  containsOnlySpaces,
  convertToInteger,
  isNotANumber,
} from "../../../utils/app-utils";

function CashRegisterManager() {
  const [billInput, setBillInput] = useState("");
  const [cashInput, setCashInput] = useState("");
  const [noOfEachAvailableNotes, setNoOfEachAvailableNotes] = useState(
    AppConstants.NO_OF_EACH_AVAILABLE_NOTES
  );
  const [outputMessage, setOutputMessage] = useState("");
  const [showNextButton, setShowNextButton] = useState(
    AppConstants.DEFAULT_CONSTANTS.NEXT_BUTTON_ENABLED
  );

  //   <-- Validity Functions Begins -->

  /**
   * Function to check validity of check button
   * @returns boolean
   */
  function isCheckButtonInvalid() {
    return billInput.length < 1 || cashInput.length < 1;
  }

  /**
   * Function to check validity of next button
   * @returns boolean
   */
  function isNextButtonInvalid() {
    return billInput.length < 1;
  }

  /**
   * Function to check input validity
   * @param input
   * @returns boolean
   */
  function isInputValid(input) {
    if (
      isNotANumber(input) ||
      containsOnlySpaces(input) ||
      convertToInteger(input) <= 0 ||
      input === ""
    ) {
      integerInputErrorHandler();
      return false;
    }
    return true;
  }

  //   <-- Validity Functions Ends -->

  //   <-- Error Handling Functions Begins -->

  /**
   * Function to handle invalid integer input
   */
  function integerInputErrorHandler() {
    setOutputMessage(AppConstants.DEFAULT_CONSTANTS.INVALID_INPUT_MESSAGE);
  }

  /**
   * Function to handle insufficient cash input
   */
  function insufficientCashHandler() {
    setOutputMessage(AppConstants.DEFAULT_CONSTANTS.INSUFFICIENT_CASH_MESSAGE);
  }

  //   <-- Error Handling Functions Ends -->

  //   <-- Change Handler Functions Begins -->

  /**
   * Function to handle bill input change
   * @param event
   */
  function billInputChangeHandler(event) {
    let inputBill = event.target.value;
    if (isInputValid(inputBill)) {
      setOutputMessage("");
      setNoOfEachAvailableNotes(AppConstants.NO_OF_EACH_AVAILABLE_NOTES);
      setBillInput(inputBill);
    } else {
      integerInputErrorHandler();
      setBillInput("");
      setShowNextButton(AppConstants.DEFAULT_CONSTANTS.NEXT_BUTTON_ENABLED);
      setCashInput("");
      setNoOfEachAvailableNotes(AppConstants.NO_OF_EACH_AVAILABLE_NOTES);
    }
  }

  /**
   * Function to handle cash input change
   * @param event
   */
  function cashInputChangeHandler(event) {
    let inputCash = event.target.value;
    if (isInputValid(inputCash)) {
      setOutputMessage("");
      setNoOfEachAvailableNotes(AppConstants.NO_OF_EACH_AVAILABLE_NOTES);
      setCashInput(inputCash);
    } else {
      integerInputErrorHandler();
      setCashInput("");
      setNoOfEachAvailableNotes(AppConstants.NO_OF_EACH_AVAILABLE_NOTES);
    }
  }

  //   <-- Change Handler Functions Ends -->

  //   <-- Click Handler Functions Begins -->

  /**
   * Function to handle when next button is clicked
   */
  function nextButtonClickHandler() {
    setShowNextButton(AppConstants.DEFAULT_CONSTANTS.NEXT_BUTTON_DISABLED);
  }

  /**
   * Function to handle when check button is clicked
   * @param cashAmount
   * @param billAmount
   */
  function checkButtonClickHandler(cashAmount, billAmount) {
    if (parseInt(cashAmount) > parseInt(billAmount)) {
      let returnChangeAmount = cashAmount - billAmount;
      calculateNoOfDenominations(returnChangeAmount);
    } else {
      insufficientCashHandler();
      setNoOfEachAvailableNotes(AppConstants.NO_OF_EACH_AVAILABLE_NOTES);
    }
  }

  /**
   * Function to calculate number of denominations
   * @param returnChangeAmount
   */
  function calculateNoOfDenominations(returnChangeAmount) {
    setOutputMessage(
      `💰 ${AppConstants.DEFAULT_CONSTANTS.RETURN_AMOUNT_MESSAGE} ${returnChangeAmount}`
    );
    let noOfEachAvailableNotesUpdated = [];
    AppConstants.AVAILABLE_NOTES.forEach((note, index) => {
      let noOfNotes = Math.trunc(returnChangeAmount / note);
      returnChangeAmount = returnChangeAmount % note;
      noOfEachAvailableNotesUpdated[index] = noOfNotes;
    });
    setNoOfEachAvailableNotes(noOfEachAvailableNotesUpdated);
  }

  //   <-- Click Handler Functions Ends -->

  //   <-- Render Functions Begins -->

  /**
   * Function to render app description
   * @returns app description
   */
  function renderAppDescriptionSection() {
    return <h3>{AppConstants.DEFAULT_CONSTANTS.APP_DESCRIPTION}</h3>;
  }

  /**
   * Function to render next button
   * @returns button
   */
  function renderNextButton() {
    if (showNextButton)
      return (
        <button
          className={`${
            isNextButtonInvalid() ? "btn-disabled" : "btn-enabled"
          }`}
          disabled={isNextButtonInvalid()}
          onClick={nextButtonClickHandler}
        >
          Next
        </button>
      );
    return null;
  }

  /**
   * Function to render bill input section
   * @returns bill input section
   */
  function renderBillInputSection() {
    return (
      <div className="sub-section">
        <label htmlFor="input-bill" className="bill-label">
          Bill Amount:
        </label>
        <input
          id="input-bill"
          value={billInput}
          onChange={billInputChangeHandler}
          placeholder={"Enter Bill Amount"}
        ></input>
        {renderNextButton()}
      </div>
    );
  }

  /**
   * Function to render check button
   * @returns check button
   */
  function renderCheckButton() {
    return (
      <button
        className={`${isCheckButtonInvalid() ? "btn-disabled" : "btn-enabled"}`}
        disabled={isCheckButtonInvalid()}
        onClick={() => checkButtonClickHandler(cashInput, billInput)}
      >
        Check
      </button>
    );
  }

  /**
   * Function to render cash input section
   * @returns cash input section
   */
  function renderCashInputSection() {
    if (!showNextButton)
      return (
        <div className="sub-section">
          <label htmlFor="input-cash" className="cash-label">
            Cash Given:
          </label>
          <input
            id="input-cash"
            value={cashInput}
            onChange={cashInputChangeHandler}
            placeholder={"Enter Cash Amount"}
          ></input>

          {renderCheckButton()}
        </div>
      );
    return null;
  }

  /**
   * Function to render output message
   * @returns output message
   */
  function renderOutput() {
    return (
      <p
        className={`${
          outputMessage.includes(
            AppConstants.DEFAULT_CONSTANTS.RETURN_AMOUNT_MESSAGE
          )
            ? "output-msg"
            : "error-msg"
        }`}
      >
        {outputMessage}
      </p>
    );
  }

  /**
   * Function to render notes table section
   * @returns notes table section
   */
  function renderNotesTableSection() {
    if (!showNextButton)
      return (
        <table className="notes-table sub-section">
          <caption>Return Change</caption>
          <tbody>
            <tr>
              <th>No. of Notes</th>
              {noOfEachAvailableNotes.map((num, index) => (
                <td key={index} className="no-of-notes">
                  {num}
                </td>
              ))}
            </tr>
            <tr>
              <th>Note</th>
              {AppConstants.AVAILABLE_NOTES.map((note, index) => (
                <td key={index} className="no-of-notes">
                  {note}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      );
    return null;
  }

  //   <-- Render Functions Ends -->

  //   <-- Rendering of Cash Register Manager App -->

  return (
    <section className="section">
      {renderAppDescriptionSection()}
      {renderBillInputSection()}
      {renderCashInputSection()}
      {renderOutput()}
      {renderNotesTableSection()}
    </section>
  );
}

export default CashRegisterManager;
