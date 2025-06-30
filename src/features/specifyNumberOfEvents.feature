Feature: Specify Number of Events
  Scenario: When user hasn't specified a number, 32 events are shown by default
    Given  the user opens the event list screen without setting a number of events
    When the event list is loaded
    Then 32 events should be displayed by default

  Scenario: User can change the number of events displayed
    Given the event list is displayed with the default number of events
    When the user inputs a new number of events to display
    Then the event list should update to show the specified number of events
