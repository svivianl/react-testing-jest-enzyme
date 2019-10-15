import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from '../tests/testUtils';
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

});
