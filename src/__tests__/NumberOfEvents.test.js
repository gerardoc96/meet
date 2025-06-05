import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

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