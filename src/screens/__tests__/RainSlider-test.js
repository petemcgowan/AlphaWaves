import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import RainSlider from '../RainSlider';
import {Provider} from 'react-redux';

const mockStore = {
  getState: jest.fn(() => ({})),
  dispatch: jest.fn(),
};

// const mockBindActionCreators = jest.fn().mockImplementation(() => ({
//   updateHasSeenIntro: jest.fn(booleanValue => {}),
// }));
// jest.mock('redux', () => ({
//   ...jest.requireActual('redux'),
//   bindActionCreators: mockBindActionCreators,
// }));
// Mock bindActionCreators from 'react-redux'
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'), // Keep other parts from the real module
  bindActionCreators: jest.fn().mockImplementation(() => ({
    updateHasSeenIntro: jest.fn(booleanValue => {}),
  })),
}));

// jest.mock('react-native-sound', () => {
//   // Mock 'Sound' as a constructor function directly
//   const mockSound = jest.fn().mockImplementation(() => ({
//     setVolume: jest.fn(),
//     setNumberOfLoops: jest.fn(),
//     // Add more needed properties
//   }));

//   return {
//     Sound: mockSound,
//     // Include any other necessary exports
//   };
// });

// jest.mock('redux-persist', () => require('../__mocks__/redux-persist'));
// jest.mock('redux-persist/lib/storage', () =>
//   require('../__mocks__/redux-persist')
// );

describe('RainSlider', () => {
  it('changes the color of the Ionicons button when pressed', () => {
    const {getByTestId} = render(
      <Provider store={mockStore}>
        <RainSlider />
      </Provider>
    );

    // const {getByTestId} = render(<RainSlider />);
    const button = getByTestId('ionicons-button');
    // Check the initial color of the button
    expect(button.props.style[0].color).toBe('rgba(191, 215, 234, 0.75)');

    fireEvent.press(button);

    // Check if the color of the button changes after the press event
    expect(button.props.style[0].color).toBe('rgba(11, 57, 84, 1)');
  });
});

// it('renders correctly', () => {
//   console.log('RainSlider non test');
// });
