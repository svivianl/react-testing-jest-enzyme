import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, findByTestAttr } from '../tests/testUtils';
import SecretWordInput, { UnconnectedSecretWordInput } from '../components/SecretWordInput';

const setup = (state={}) => { 
  const store = storeFactory(state);
  return shallow(<SecretWordInput store={store}/>).dive().dive();
}

describe('render', () => {

    // let wrapper;

    // beforeEach(() => {
    //     wrapper = setup();
    // });

    // test('input field', () => {
    //     const element = findByTestAttr(wrapper, 'secret-word-input');
    //     expect(element.length).toBe(1);
    // });

    // test('set secret word button', () => {
    //     const element = findByTestAttr(wrapper, 'secret-word-set-button');
    //     expect(element.length).toBe(1);
    // });
});