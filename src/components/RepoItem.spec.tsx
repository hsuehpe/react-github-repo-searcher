import { render, screen, within } from '@testing-library/react';
import RepoItem from './RepoItem';

describe('RepoItem', () => {
  test('should render RepoItem on screen', () => {
    const repo = {
      id: 106017343,
      fullName: 'tailwindlabs/tailwindcss',
      description: 'Completely unstyled, fully accessible UI components, designed to integrate beautifully with Tailwind CSS.',
      htmlUrl: 'https://github.com/tailwindlabs/headlessui',
      starCount: 50883,
      language: 'JavaScript',
    }
    render(<RepoItem
      {...repo}
    />);

    const h2 = screen.getByRole('heading');
    expect(within(h2).getByText('tailwindlabs/tailwindcss')).toBeInTheDocument();
    expect(screen.getByText(/JavaScript/i)).toBeInTheDocument();
    expect(screen.getByText(/50883/i)).toBeInTheDocument();
  });
});
