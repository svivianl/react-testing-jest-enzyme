import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from './testUtils';
import App from '../components/App';
import * as actions from '../actions/hookActions';

const mockGetSecretWord = jest.fn();

const setup = (secretWord = 'party') => {
  mockGetSecretWord.mockClear();
  actions.getSecretWord = mockGetSecretWord;
  const mockUseReducer = jest.fn()
    .mockReturnValue([{secretWord, language: 'en'}, jest.fn()]);
  React.useReducer = mockUseReducer;
  return mount(<App />);
}

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('getSecretWord calls', () => {
  test('getSecretWord gets called on App mount', () => {
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    // if wrapper.update does not work, try to use wrapper.setProps
    wrapper.update();
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe('secretWord is not null', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup('party');
  });

  test('renders App', () => {
    const component = findByTestAttr(wrapper, 'component-app');
    expect(component.exists()).toBe(true);
  });
  test('does not render spinner', () => {
    const component = findByTestAttr(wrapper, 'component-spinner');
    expect(component.exists()).toBe(false);
  });
});

describe('secretWord is null', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup(null);
  });

  test('does not renders App', () => {
    const component = findByTestAttr(wrapper, 'component-app');
    expect(component.exists()).toBe(false);
  });
  test('renders not render spinner', () => {
    const component = findByTestAttr(wrapper, 'component-spinner');
    expect(component.exists()).toBe(true);
  });
});