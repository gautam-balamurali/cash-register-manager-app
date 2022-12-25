/* eslint-disable */
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import * as AppConstants from "./config/app-config";
import { useState } from "react";

function App() {
  const [billInput, setBillInput] = useState("");
  const [cashInput, setCashInput] = useState("");
  const [noOfEachAvailableNotes, setNoOfEachAvailableNotes] = useState(
    AppConstants.NO_OF_EACH_AVAILABLE_NOTES
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [showNextButton, setShowNextButton] = useState(true);

  function integerInputErrorHandler() {
    setErrorMessage("Input should be a valid integer greater than 0.");
  }

  function insufficientCashHandler() {
    setErrorMessage("Insufficient Cash! You know the drill!😡");
  }

  function isCheckButtonInvalid() {
    return billInput.length < 1 || cashInput.length < 1;
  }

  function isNextButtonInvalid() {
    return billInput.length < 1;
  }

  function isInputValid(input) {
    if (isNaN(input) || parseInt(input) < 0 || input === "") {
      integerInputErrorHandler();
      return false;
    }
    return true;
  }

  function billInputChangeHandler(event) {
    let inputBill = event.target.value;
    if (isInputValid(inputBill)) {
      setErrorMessage("");
      setBillInput(inputBill);
    } else {
      integerInputErrorHandler();
      setBillInput("");
      setShowNextButton(true);
      setCashInput("");
      setNoOfEachAvailableNotes(AppConstants.NO_OF_EACH_AVAILABLE_NOTES);
    }
  }

  function cashInputChangeHandler(event) {
    let inputCash = event.target.value;
    if (isInputValid(inputCash)) {
      setErrorMessage("");
      setNoOfEachAvailableNotes(AppConstants.NO_OF_EACH_AVAILABLE_NOTES);
      setCashInput(inputCash);
    } else {
      integerInputErrorHandler();
      setCashInput("");
      setNoOfEachAvailableNotes(AppConstants.NO_OF_EACH_AVAILABLE_NOTES);
    }
  }

  function nextButtonClickHandler() {
    setShowNextButton(false);
  }

  function checkButtonClickHandler(cashAmount, billAmount) {
    if (parseInt(cashAmount) > parseInt(billAmount)) {
      setErrorMessage("");
      let returnChange = cashAmount - billAmount;
      let noOfEachAvailableNotesUpdated = [];
      AppConstants.AVAILABLE_NOTES.forEach((note, index) => {
        let noOfNotes = Math.trunc(returnChange / note);
        returnChange = returnChange % note;
        noOfEachAvailableNotesUpdated[index] = noOfNotes;
      });
      setNoOfEachAvailableNotes(noOfEachAvailableNotesUpdated);
    } else {
      insufficientCashHandler();
      setNoOfEachAvailableNotes(AppConstants.NO_OF_EACH_AVAILABLE_NOTES);
    }
  }

  function renderNextButton() {
    if (showNextButton)
      return (
        <button
          className="button"
          disabled={isNextButtonInvalid()}
          onClick={nextButtonClickHandler}
        >
          Next
        </button>
      );
    return null;
  }

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
            placeholder={'Enter Cash Amount'}
          ></input>

          <button
            className="button"
            disabled={isCheckButtonInvalid()}
            onClick={() => checkButtonClickHandler(cashInput, billInput)}
          >
            Check
          </button>
        </div>
      );
    return null;
  }

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

  return (
    <div className="App">
      <Header></Header>
      <section className="section">
        <h3>
          Enter the bill amount and cash given by the customer and know minimum
          number of notes to return.
        </h3>

        <label htmlFor="input-bill" className="bill-label">
          Bill Amount:
        </label>
        <input
          id="input-bill"
          value={billInput}
          onChange={billInputChangeHandler}
          placeholder={'Enter Bill Amount'}
        ></input>

        {renderNextButton()}

        {renderCashInputSection()}

        <p className="error-msg">{errorMessage}</p>

        {renderNotesTableSection()}
      </section>
      <Footer></Footer>
    </div>
  );
}

export default App;
