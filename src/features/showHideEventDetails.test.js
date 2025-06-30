import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';


const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {

    let AppDOM, eventItems;
    given('the user opens the event list screen', () => {

      const { container } = render(<App />);
      AppDOM = container.firstChild;
    });

    when('the event list is loaded', async () => {
      await waitFor(() => {
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
      });

      const eventList = AppDOM.querySelector('#event-list');
      eventItems = within(eventList).queryAllByRole('listitem');

    });

    then('each event element should be collapsed by default', () => {
      eventItems.forEach(li => {
        const details = li.querySelector('#event-list');
        expect(details).not.toBeInTheDocument();
      });
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {

    let firstEvent;
    given('the event list is displayed with collapsed events', async () => {
      const { container } = render(<App />);
      const AppDOM = container.firstChild;

      const eventList = await waitFor(() =>
        AppDOM.querySelector('#event-list')
      );
      firstEvent = within(eventList).getAllByRole('listitem')[0];

      expect(firstEvent.querySelector('[data-testid="event-details"]')).not.toBeInTheDocument();
    });

    when('the user clicks or taps on an event element', async () => {
      const user = userEvent.setup();
      const toggleBtn = within(firstEvent).getByRole('button', { name: /show details/i });
      await user.click(toggleBtn);
    });

    then('the event element should expand to show its details', async () => {
      await waitFor(() => {
        expect(firstEvent.querySelector('[data-testid="event-details"]')).toBeInTheDocument();
      });
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {

    let firstEvent;
    given('an event element is expanded to show details', async () => {
      const { container } = render(<App />);
      const AppDOM = container.firstChild;

      const eventList = await waitFor(() =>
        AppDOM.querySelector('#event-list')
      );
      firstEvent = within(eventList).getAllByRole('listitem')[0];

      const user = userEvent.setup();
      const toggleBtn = within(firstEvent).getByRole('button', { name: /show details/i });
      await user.click(toggleBtn);

      await waitFor(() => {
        expect(firstEvent.querySelector('[data-testid="event-details"]')).toBeInTheDocument();
      });
    });

    when('the user clicks or taps on the expanded event element', async () => {
      const user = userEvent.setup();
      const collapseBtn = within(firstEvent).getByRole('button', { name: /hide details/i });
      await user.click(collapseBtn);
    });

    then('the event element should collapse to hide its details', async () => {
      await waitFor(() => {
        expect(firstEvent.querySelector('[data-testid="event-details"]')).not.toBeInTheDocument();
      });
    });
  });

});