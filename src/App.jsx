import React from 'react'
import { useState } from 'react'
import './App.css'
import EventList from './components/EventList'
import CitySearch from './components/CitySearch'
import NumberOfEvents from './components/NumberOfEvents'


const App = () => {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState('32');

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
