import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory } from '../tests/testUtils';
import App, { UnconnectedApp } from '../components/App';

const setup = (state={}) => {
  const store = storeFactory(state);
  return shallow(<App store={store}/>).dive().dive();
}

describe('redux properties', () => {

  test('has access to "success" state', () => {
    const success = true;
    const wrapper = setup({ success });
    const prop = wrapper.instance().props.success;
    expect(prop).toBe(success);
  });

  test('has access to "secretWord" state', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const prop = wrapper.instance().props.secretWord;
    expect(prop).toBe(secretWord);
  });

  test('has access to "guessedWords" state', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const prop = wrapper.instance().props.guessedWords;
    expect(prop).toEqual(guessedWords);
  });

  test('"getSecretWord" action creator is a function on the props', () => {
    const wrapper = setup();
    const prop = wrapper.instance().props.getSecretWord;
    expect(prop).toBeInstanceOf(Function);
  });
});

describe('life-cycle methods', () => {

  test('"getSecretWord" runs on App mount', () => {
    // create Mock function that jest will just watch to see when it is called and how
    const getSecretWordMock = jest.fn();

    const props = {
      getSecretWord: getSecretWordMock,
      success: false,
      guessedWords: [],
    }

    // set up app component with getSecretWordMock as the getSecretWord prop
    const wrapper = shallow(<UnconnectedApp {...props} />);

    // run lifecycle method
    wrapper.instance().componentDidMount();

    // check to see if mock ran and how many times it was called
    const getSecretWordCallCount = getSecretWordMock.mock.calls.length;

    expect(getSecretWordCallCount).toBe(1);
  });  
});