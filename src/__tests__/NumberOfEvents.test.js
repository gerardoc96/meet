import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';
import { getEvents, extractLocations } from '../api';

jest.mock('../api', () => ({
  getEvents: jest.fn(),
  extractLocations: jest.fn(),
}));

describe('<NumberOfEvents /> component', () => {

  test('contains an element with the role of textbox', () => {
    render(<NumberOfEvents />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });


  test('has a default value of 32', () => {
    render(<NumberOfEvents numberOfEvents="32" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('32');
  });

  test('updates value when user types', async () => {
    const user = userEvent.setup();
    const TestWrapper = () => {
      const [numberOfEvents, setNumberOfEvents] = React.useState('32');
      return (
        <NumberOfEvents
          numberOfEvents={numberOfEvents}
          setNumberOfEvents={setNumberOfEvents}
        />
      );
    };
    render(<TestWrapper />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('32');
    await user.type(input, '{backspace}{backspace}10');
    expect(input).toHaveValue('10');
  });

});

describe('<NumberOfEvents /> Integration', () => {
  test('renders only as many events as the user inputs', async () => {

    // Mock a small list of events
    const mockEvents = [
      { id: '1', summary: 'Event 1', location: 'Test City', start: { dateTime: '2025-06-01T10:00:00Z' } },
      { id: '2', summary: 'Event 2', location: 'Test City', start: { dateTime: '2025-06-02T10:00:00Z' } },
      { id: '3', summary: 'Event 3', location: 'Test City', start: { dateTime: '2025-06-03T10:00:00Z' } },
    ];
    getEvents.mockResolvedValue(mockEvents);
    extractLocations.mockReturnValue(['Test City']);

    const user = userEvent.setup();

    // Render the full App
    const { container } = render(<App />);

    // Assert initial load (default is 32 → all 3 events)
    await waitFor(() => {
      const items = container.querySelectorAll('#event-list li');
      expect(items).toHaveLength(mockEvents.length);
    });

    // Change the number-of-events input to "2"
    const input = screen.getByLabelText(/number of events/i);
    await user.clear(input);
    await user.type(input, '2');

    // Only 2 events are shown
    await waitFor(() => {
      const items = container.querySelectorAll('#event-list li');
      expect(items).toHaveLength(2);
    });
  });
});
