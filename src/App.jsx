import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import EventList from './components/EventList'
import CitySearch from './components/CitySearch'
import NumberOfEvents from './components/NumberOfEvents'
import { getEvents } from './api'

const App = () => {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState('32');

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, numberOfEvents));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <CitySearch />

      <NumberOfEvents
        numberOfEvents={numberOfEvents}
        setNumberOfEvents={setNumberOfEvents} />

      <EventList events={events} />

    </div>
  );
}


export default App;
