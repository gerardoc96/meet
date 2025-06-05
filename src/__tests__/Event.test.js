import React from 'react';
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";

describe('<Event /> component', () => {
  let EventComponent;
  let eventData;

  //Mock data and render the component before each test
  beforeEach(() => {
    eventData = {
      summary: 'Test Event',
      start: { dateTime: '2023-01-01T12:00:00' },
      location: 'Test Location',
      description: 'This is a test event',
      htmlLink: 'https://example.com/event'
    };
    EventComponent = render(<Event event={eventData} />);
  });

  test('renders event title', () => {
    expect(EventComponent.queryByText('Test Event')).toBeInTheDocument();
  });

  test('renders event Start time', () => {
    expect(EventComponent.queryByText('2023-01-01T12:00:00')).toBeInTheDocument();
  });

  test('renders event location', () => {
    expect(EventComponent.queryByText('Test Location')).toBeInTheDocument();
  });

  test('does not render event detials by default', () => {
    expect(EventComponent.queryByTestId("event-details")).not.toBeInTheDocument();
  });

  test('renders event details when show details button is clicked', async () => {
    const user = userEvent.setup();
    const button = EventComponent.getByText('show details');
    await user.click(button);
    expect(EventComponent.getByText('About event:')).toBeInTheDocument();
    expect(EventComponent.getByText('This is a test event')).toBeInTheDocument();
    expect(EventComponent.getByText('See detials on Google Calendar')).toBeInTheDocument();
  });

  test('hides event details when hide details button is clicked', async () => {
    const user = userEvent.setup();

    expect(EventComponent.queryByTestId("event-details")).not.toBeInTheDocument();
    const button = EventComponent.getByRole("button");
    expect(button).toHaveTextContent("show details");

    await user.click(button);

    expect(EventComponent.getByTestId("event-details")).toBeInTheDocument();
    expect(button).toHaveTextContent("hide details");

    await user.click(button);

    expect(EventComponent.queryByTestId("event-details")).not.toBeInTheDocument();
    expect(button).toHaveTextContent("show details");

  });

});