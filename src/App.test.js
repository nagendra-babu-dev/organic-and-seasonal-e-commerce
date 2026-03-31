import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  const appElement = document.getElementById('root');
  expect(appElement).toBeInTheDocument();
});