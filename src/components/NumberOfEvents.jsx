import React from 'react';

const NumberOfEvents = ({ numberOfEvents, setNumberOfEvents }) => {
  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events:</label>
      <input
        id="number-of-events-input"
        type="text"
        value={numberOfEvents}
        onChange={(e) => setNumberOfEvents(e.target.value)}
      />
    </div>
  );
};

export default NumberOfEvents;