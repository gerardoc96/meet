import React from 'react';

const NumberOfEvents = ({ numberOfEvents, setNumberOfEvents }) => {
  return (
    <div id="number-of-events">
      <label>Number of Events: </label>
      <input
        type="text"
        value={numberOfEvents}
        onChange={(e) => setNumberOfEvents(e.target.value)}
      />
    </div>
  );
};

export default NumberOfEvents;