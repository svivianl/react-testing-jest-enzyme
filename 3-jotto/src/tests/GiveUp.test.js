import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from '../tests/testUtils';
import GiveUp, { UnconnectedGiveUp } from '../components/GiveUp.js';

const setup = (state={}) => {
    const store = storeFactory(state);
    return shallow(<GiveUp store={store}/>).dive().dive();
}

describe('render', () => {
  test('has not "Give up" button when giveUp is true', () => {
    const wrapper = setup({giveUp: true});
    const button = findByTestAttr(wrapper, 'give-up-button');
    expect(button.length).toBe(0);
  });
  test('has not element to display the old secretWord', () => {
      const wrapper = setup();
      const secretWordElement = findByTestAttr(wrapper, 'give-up-secret-word');
      expect (secretWordElement.length).toBe(0);
  });
  test('has "Give up" button when giveUp is false', () => {
    const wrapper = setup({giveUp: false});
    const button = findByTestAttr(wrapper, 'give-up-button');
    expect(button.length).toBe(1);
  });
  test('has not New Word button', () => {
    const wrapper = setup();
    const newWordElement = findByTestAttr(wrapper, 'new-word-button');
    expect (newWordElement.length).toBe(0);
  });
});

test('calls giveUpAction when "Give up" button is clicked', () => {
  const giveUpActionMock = jest.fn();
  const props = {
    secretWord: 'party',
    giveUpAction: giveUpActionMock
  }
  const wrapper = shallow(<UnconnectedGiveUp {...props} />);
  const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
  giveUpButton.simulate('click', { preventDefault(){} });
  const getGiveUpActionCallCount = giveUpActionMock.mock.calls.length;
  expect(getGiveUpActionCallCount).toBe(1);
})

describe('when giveUp is true', () => {
  let wrapper;
  let props;
  let resetGameMock;

  beforeEach(() => {
    resetGameMock = jest.fn();

    props = {
        secretWord: 'party',
        giveUp: true,
        resetGame: resetGameMock
    }
  
    wrapper = shallow(<UnconnectedGiveUp {...props} />);
    wrapper.setState({ giveUpSecretWord: props.secretWord });
  });
  test('has no giveUp button', () => {
    const giveUpButton = findByTestAttr(wrapper, 'give-up-button');
    expect (giveUpButton.length).toBe(0);
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
    const newWordButton = findByTestAttr(wrapper, 'new-word-button');
    newWordButton.simulate('click', { preventDefault(){} });
    // check to see if mock ran and how many times it was called
    const getResetGameCallCount = resetGameMock.mock.calls.length;
    expect(getResetGameCallCount).toBe(1);
  });
  test('has not give-up-secret-word when New Word button is clicked', () => {
    const newWordButton = findByTestAttr(wrapper, 'new-word-button');
    newWordButton.simulate('click', { preventDefault(){} });

    const element = findByTestAttr(wrapper, 'give-up-secret-word');
    expect(element.length).toBe(0);
  });
  test('has not new-word-button when New Word button is clicked', () => {
    const newWordButton = findByTestAttr(wrapper, 'new-word-button');
    newWordButton.simulate('click', { preventDefault(){} });

    const element = findByTestAttr(wrapper, 'new-word-button');
    expect(element.length).toBe(0);
  });
});