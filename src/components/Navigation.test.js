import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';

test('renders wallet link', () => {
  render(<Navigation />);
  const linkElement = screen.queryByText('./Wallet');
  expect(linkElement).toBeInTheDocument();
});
