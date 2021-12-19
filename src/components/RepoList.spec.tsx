/* eslint-disable testing-library/no-unnecessary-act */
import { fireEvent, render, screen } from '@testing-library/react';
import RepoList from './RepoList';
import searchResult from '../mockData/searchResult'
import { getRepos as mockGetRepos } from '../api/search'
import { act } from 'react-dom/test-utils';

jest.mock('../api/search');

describe('RepoList', () => {
  test('should render input on screen', async () => {
    await act(async () => {
      render(<RepoList />);
    });
    const inputEl = screen.getByRole('textbox');
    expect(inputEl).toBeTruthy();
  });

  test('fire input event', async () => {
    (mockGetRepos as any).mockResolvedValueOnce({searchResult});
    await act(async () => {
      render(<RepoList />);
    });
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'react' }});
    expect(mockGetRepos).toHaveBeenCalled();
  });
});
