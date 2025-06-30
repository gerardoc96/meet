import React from 'react';
import { useState } from 'react';


const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.start.dateTime}</p>
      <p>{event.location}</p>
      <button className="details-btn" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide details' : 'show details'}
      </button>
      {showDetails && (
        <div className="event-details" data-testid="event-details" >
          <h3>About event:</h3>
          <p>{event.description}</p>
          <a href={event.htmlLink} target="_blank">
            See detials on Google Calendar
          </a>
        </div>
      )}
    </li>
  );
}


export default Event;