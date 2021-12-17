import { render, screen } from '@testing-library/react';
import RepoList from './RepoList';

const IntersectionObserverMock: any = function() {
  return {
    observe: jest.fn(),
    disconnect: jest.fn(),
  };
};

global.IntersectionObserver = IntersectionObserverMock;

describe('RepoList', () => {
  test('should render input on screen', () => {
    render(<RepoList />);
    const inputEl = screen.getByRole('textbox');
    expect(inputEl).toBeTruthy();
  });
})