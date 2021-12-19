import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('render h1', () => {
    render(<App />);
    const h1El = screen.getByText(/Github Repositories Searcher/i);
    expect(h1El).toBeInTheDocument();
  });
});
