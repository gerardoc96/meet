Feature: Show/Hide Event Details
  Scenario: An event element is collapsed by default
    Given the user opens the event list screen
    When the event list is loaded
    Then each event element should be collapsed by default

  Scenario: User can expand an event to see details
    Given the event list is displayed with collapsed events
    When the user clicks or taps on an event element
    Then the event element should expand to show its details

  Scenario: User can collapse an event to hide details
    Given an event element is expanded to show details
    When the user clicks or taps on the expanded event element
    Then the event element should collapse to hide its details