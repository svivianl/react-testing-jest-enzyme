import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from '../tests/testUtils';
import Reset, { UnconnectedReset } from '../components/Reset';

const setup = (state={}) => { 
  const store = storeFactory(state);
  return shallow(<Reset store={store}/>).dive().dive();
}

describe('redux properties', () => {
  test('has Reset button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'reset-button');
    expect(button.length).toBe(1);
  });
});

test('call resetGame on Reset', () => {

  // create Mock function that jest will just watch to see when it is called and how
  const resetGameMock = jest.fn();    
  const props = {
    resetGame: resetGameMock
  }

  // set up app component with getSecretWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedReset {...props} />);
  const resetButton = findByTestAttr(wrapper, 'reset-button');
  resetButton.simulate('click', { preventDefault(){} });
  // check to see if mock ran and how many times it was called
  const getResetGameCallCount = resetGameMock.mock.calls.length;
  expect(getResetGameCallCount).toBe(1);
});
