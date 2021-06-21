import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

//  cleanup is passed as a parameter to afterEach to just clean up everything after each test to avoid memory leaks.
afterEach(cleanup);

test('renders app component', () => {

  // render the App component with render and get back asFragment as a returned value
  const { asFragment } = render(<App />);    

  // make sure that the fragment of the App component matches the snapshot.
  expect(asFragment(<App />)).toMatchSnapshot();  
});
