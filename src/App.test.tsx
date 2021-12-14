import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const h1El = screen.getByText(/Hello React/i);
  expect(h1El).toBeInTheDocument();
});
