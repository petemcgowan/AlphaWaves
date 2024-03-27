import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import CountdownTimer from '../CountdownTimer';
import {it, expect, jest, describe} from '@jest/globals';
import '@testing-library/jest-dom';

describe('CountdownTimer component', () => {
  it('renders the initial time correctly', async () => {
    const initialTime = {hours: 0, minutes: 1, seconds: 30};

    const {getByText /*, debug*/} = render(
      <CountdownTimer
        {...initialTime}
        togglePlayback={() => {}}
        setTimerVisible={() => {}}
        timerControlsFontColor="#000000"
      />
    );
    // debug()

    await waitFor(
      () => {
        const displayedTime = getByText('0:01:29');
        expect(displayedTime).toBeTruthy();
      },
      {timeout: 2000}
    );
  });
});

// it('renders correctly', () => {
//   console.log('CountdownTimer non test')
// })
