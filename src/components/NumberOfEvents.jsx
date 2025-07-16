import React from 'react';

const NumberOfEvents = ({ numberOfEvents, setNumberOfEvents, setErrorAlert }) => {

  const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setNumberOfEvents("");
      setErrorAlert("");
      return;
    }

    // Check if the input is a number and positive
    if (isNaN(value) || parseInt(value) < 1) {
      setErrorAlert("Please enter a valid number greater than 0.");
    } else {
      setErrorAlert("");
      setNumberOfEvents(value);
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events:</label>
      <input
        id="number-of-events-input"
        type="text"
        value={numberOfEvents}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;