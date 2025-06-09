import React from 'react'
import { useState, useEffect } from 'react'
import EventList from './components/EventList'
import CitySearch from './components/CitySearch'
import NumberOfEvents from './components/NumberOfEvents'
import { getEvents, extractLocations } from './api'

import './App.css'

const App = () => {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState('32');
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, numberOfEvents));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} />

      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        setNumberOfEvents={setNumberOfEvents} />

      <EventList events={events} />

    </div>
  );
}


export default App;
