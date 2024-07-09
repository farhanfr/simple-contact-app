/**
 * @format
 */

// import 'react-native';
// import React from 'react';
// import App from '../App';

// // Note: import explicitly to use the types shipped with jest.
import {it,expect,describe} from '@jest/globals';

// // Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });


import React from 'react';
import { render } from '@testing-library/react-native';
import ListContactScreen from '../src/screens/list_contact';

describe('ListContactScreen renders correctly', () => {
  const { getByText } = render(<ListContactScreen />);
  const textElement = getByText('List Contacts');
  expect(textElement).toBeTruthy();
});


describe('ListContactScreen check function', () => {
  it('should navigate to DetailContactScreen when press item', () => {
    const { getByText } = render(<ListContactScreen />);
    const textElement = getByText('List Contacts');
    fireEvent.press(textElement);
    expect(navigation.navigate).toHaveBeenCalledWith(DETAIL_CONTACT_ROUTE, { id: '1' });
  });
});

