import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr, checkProps } from './testUtils';
import languageContext from '../context/languageContext';
import Input, { UnconnectedInput } from '../components/Input';
import { wrap } from 'module';

const defaultProps = {
    language: 'en',
    secretWord: 'party'
}
const setup = ({language, secretWord}) => {
    // const store = storeFactory(initialState);
    // use .dive() to get the child component
    return mount(
        <languageContext.Provider value={language}>
            <Input secretWord={secretWord}/>
        </languageContext.Provider>
    );
}

test('renders without error', () =>{
    const wrapper = setup(defaultProps);
    const component = findByTestAttr(wrapper, 'component-input');
    expect(component.length).toBe(1);
});

test('does not throw warning with expected props', () => {
    checkProps(Input, { secretWord: 'party' });
});

describe('state controlled input field', () => {
    let mockSetCurrentGuess = jest.fn();
    let wrapper;

    beforeEach(() => {
        // clear the result of the last test
        mockSetCurrentGuess.mockClear();
        // pass replacement function
        // [firstValue, secondValue]
        // firstValue = currentState
        // secondValue = setCurrentState
        React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
        wrapper = setup(defaultProps);
    })

    test('state updates with value of input box upon change', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');
        const mockEvent = { target: { value: 'train' } };
        inputBox.simulate('change', mockEvent);
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    });

    test('field is cleared when submit buttom is clicked', () => {
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        submitButton.simulate('click', { preventDefault(){} });
        expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
    });
});

describe('languagePicker', () => {
    test('renders submit string in English', () => {
        const wrapper = setup({...defaultProps});
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('Submit');
    });
    test('renders submit string in emoji', () => {
        const wrapper = setup({...defaultProps, language: 'emoji'});
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('🚀');
    });
});