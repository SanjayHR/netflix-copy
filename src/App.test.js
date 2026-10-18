import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/Body', () => {
  const { useSelector } = require('react-redux');

  return function MockBody() {
    const user = useSelector((state) => state.user);
    return <div>{user === null ? 'Redux provider is active' : 'Unexpected user state'}</div>;
  };
});

test('provides the Redux store to the app body', () => {
  render(<App />);
  expect(screen.getByText('Redux provider is active')).toBeInTheDocument();
});
