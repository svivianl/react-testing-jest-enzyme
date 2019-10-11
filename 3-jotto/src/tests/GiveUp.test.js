import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from '../tests/testUtils';
import GiveUp, { UnconnectedGiveUp } from '../components/GiveUp.js';

const setup = (state={}) => {
    const store = storeFactory(state);
    return shallow(<GiveUp store={store}/>).dive().dive();
}

describe('redux properties', () => {
    test('has not "Give up" button when SUCCESS is true', () => {
        const wrapper = setup({success: true});
        const button = findByTestAttr(wrapper, 'give-up-button');
        expect(button.length).toBe(0);
    });
    test('has "Give up" button when SUCCESS is false', () => {
      const wrapper = setup({success: false});
      const button = findByTestAttr(wrapper, 'give-up-button');
      expect(button.length).toBe(1);
  });
  test('has not element to display the old secretWord', () => {
      const wrapper = setup();
      const secretWordElement = findByTestAttr(wrapper, 'give-up-secret-word');
      expect (secretWordElement.length).toBe(0);
  });
  test('has not New Word button', () => {
    const wrapper = setup();
    const newWordElement = findByTestAttr(wrapper, 'new-word-button');
    expect (newWordElement.length).toBe(0);
  });
});

describe('on "Give up" click', () => {
  let wrapper;
  let props;
  let resetGameMock;

  beforeEach(() => {
    resetGameMock = jest.fn();

    props = {
        secretWord: 'party',
        resetGame: resetGameMock
    }
  
    // set up app component with getSecretWordMock as the getSecretWord prop
    wrapper = shallow(<UnconnectedGiveUp {...props} />);
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
    giveUpButton.simulate('click', { preventDefault(){} });
  });

  test('has element to display the old secretWord', () => {
    const secretWordElement = findByTestAttr(wrapper, 'give-up-secret-word');
    expect (secretWordElement.length).toBe(1);
  });

  test('displays the old secretWord', () => {
    const secretWordElement = findByTestAttr(wrapper, 'give-up-secret-word');
    expect (secretWordElement.text()).toMatch(props.secretWord);
  });

  test('has New Word button', () => {
    const newWordElement = findByTestAttr(wrapper, 'new-word-button');
    expect (newWordElement.length).toBe(1);
  });

  test('calls resetGame when New Word button is clicked', () => {
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
    giveUpButton.simulate('click', { preventDefault(){} });

    const newWordButton = findByTestAttr(wrapper, 'new-word-button');
    newWordButton.simulate('click', { preventDefault(){} });
    // check to see if mock ran and how many times it was called
    const getResetGameCallCount = resetGameMock.mock.calls.length;
    expect(getResetGameCallCount).toBe(1);
  });
  test('has not give-up-secret-word when New Word button is clicked', () => {
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
    giveUpButton.simulate('click', { preventDefault(){} });

    const newWordButton = findByTestAttr(wrapper, 'new-word-button');
    newWordButton.simulate('click', { preventDefault(){} });

    const element = findByTestAttr(wrapper, 'give-up-secret-word');
    expect(element.length).toBe(0);
  });
  test('has not new-word-button when New Word button is clicked', () => {
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
    giveUpButton.simulate('click', { preventDefault(){} });

    const newWordButton = findByTestAttr(wrapper, 'new-word-button');
    newWordButton.simulate('click', { preventDefault(){} });

    const element = findByTestAttr(wrapper, 'new-word-button');
    expect(element.length).toBe(0);
  });
});