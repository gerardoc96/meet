# Meet App
## Overview
Meet App is a serverless, progressive web application (PWA) built with React and developed using Test-Driven Development (TDD) principles. It uses the Google Calendar API to fetch and display upcoming events based on the user's selected city. The application features offline support, data visualization, and the ability to install the app on a device's home screen.

---

# Features

## 1. Filter Events by City
### User Story
As a user, I should be able to filter events by city so I can quickly find events happening in a specific location without scrolling through irrelevant options.

---

## 2. Show/Hide Event Details
### User Story
As a user, I should be able to show or hide event details so I can easily access more information when I need it without overwhelming my screen space.

### Scenario: An event element is collapsed by default
Given the user opens the event list screen
When the event list is loaded
Then each event element should be collapsed by default

### Scenario: User can expand an event to see details
Given the event list is displayed with collapsed events
When the user clicks or taps on an event element
Then the event element should expand to show its details
 
### Scenario: User can collapse an event to hide details
Given an event element is expanded to show details
When the user clicks or taps on the expanded event element
Then the event element should collapse to hide its details
 
---

## 3. Specify Number of Events
### User Story
As a user, I should be able to specify how many events I want to see at once to customize my view for easier browsing.

### Scenario: When user hasn't specified a number, 32 events are shown by default
Given the user opens the event list screen without setting a number of events
When the event list is loaded
Then 32 events should be displayed by default
 
### Scenario: User can change the number of events displayed
Given the event list is displayed with the default number of events
When the user inputs a new number of events to display
Then the event list should update to show the specified number of events

---

## 4. Use the App When Offline
### User Story
As a user, I should be able to view and interact with previously loaded event information even when I'm offline to stay informed about events no matter where I am.

### Scenario: Show cached data when there's no internet connection
Given the user has previously loaded event data
And the device has no internet connection
When the user opens the event list screen
Then the app should display the cached event data 

### Scenario: Show error when user changes search settings while offline
Given the user is offline
And the event list screen is open
When the user attempts to change the city or number of events
Then an error message should be displayed indicating that changes cannot be made while offline
 
---

## 5. Add an App Shortcut to the Home Screen
### User Story
As a user, I should be able to add the app to my device's home screen to quickly access event information like a native app.

### Scenario: User can install the meet app as a shortcut on their device home screen
Given the user is visiting the meet app in a supported browser
When the user is prompted to install the app
And the user accepts the installation
Then the meet app should be added as a shortcut on the device home screen 

---

## 6. Display Charts Visualizing Event Details
### User Story
As a user, I should be able to view charts summarizing event details to quickly understand patterns like event popularity or category distribution at a glance.

### Scenario: Show a chart with the number of upcoming events in each city
Given the user is viewing the event dashboard
When the event data is loaded
Then a chart should be displayed showing the number of upcoming events for each city.

---

## Tech Stack
- React (Create React App)
- Serverless Functions (AWS Lambda)
- Google Calendar API + OAuth2 Authentication
- PWA (Progressive Web App standards)
- Testing: Jest, React Testing Library, Cucumber
- Data Visualization: Recharts (or similar)
- Hosting: Vercel

