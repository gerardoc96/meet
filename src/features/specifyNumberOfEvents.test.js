import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn\'t specified a number, 32 events are shown by default', ({ given, when, then }) => {

    let AppDOM, eventItems;
    given('the user opens the event list screen without setting a number of events', () => {
      const { container } = render(<App />);
      AppDOM = container.firstChild;

    });

    when('the event list is loaded', async () => {

      const eventList = await waitFor(() =>
        AppDOM.querySelector('#event-list')
      );
      eventItems = within(eventList).getAllByRole('listitem');

    });

    then(/^(\d+) events should be displayed by default$/, (arg0) => {

      expect(eventItems).toHaveLength(32);

    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {

    let AppDOM, eventList, eventItems;
    given('the event list is displayed with the default number of events', async () => {
      const { container } = render(<App />);
      AppDOM = container.firstChild;
      eventList = await waitFor(() =>
        AppDOM.querySelector('#event-list')
      );
      eventItems = within(eventList).getAllByRole('listitem');

      expect(eventItems).toHaveLength(32);
    });

    when('the user inputs a new number of events to display', async () => {
      const user = userEvent.setup();

      const input = AppDOM.querySelector('#number-of-events-input');
      await user.clear(input);

      await user.type(input, String(5));

      input.blur();
    });

    then('the event list should update to show the specified number of events', async () => {

      await waitFor(() => {
        const updatedItems = within(eventList).getAllByRole('listitem');
        expect(updatedItems).toHaveLength(5);

      });
    });
  });

});