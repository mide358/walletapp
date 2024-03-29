import { render, screen } from '@testing-library/react';
import App from './App';

test('renders wallet link', () => {
  render(<App />);
  const linkElement = screen.queryByText('Wallet');
  expect(linkElement).toBeInTheDocument();
});
