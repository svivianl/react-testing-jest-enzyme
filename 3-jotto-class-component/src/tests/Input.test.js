import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from './testUtils';
import Input, { UnconnectedInput } from '../components/Input';
import { wrap } from 'module';

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    // use .dive() to get the child component
    return shallow(<Input store={store}/>).dive().dive();
}

describe('render', () => {

    describe('word has not been guessed', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = { success: false };
            wrapper = setup(initialState);
        });

        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        test('renders input box', () => {
            const node = findByTestAttr(wrapper, 'input-box');
            expect(node.length).toBe(1);
        });

        test('renders submit button', () => {
            const node = findByTestAttr(wrapper, 'submit-button');
            expect(node.length).toBe(1);
        });
    });

    describe('word has been guessed', () => {
        
        let wrapper;
        beforeEach(() => {
            const initialState = { success: true };
            wrapper = setup(initialState);
        });

        test('does not render component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });

        test('does not render input box', () => {
            const node = findByTestAttr(wrapper, 'input-box');
            expect(node.length).toBe(0);
        });

        test('does not render submit button', () => {
            const node = findByTestAttr(wrapper, 'submit-button');
            expect(node.length).toBe(0);
        });
    });
});

describe('redux props', () => {
    test('has success piece of state as prop', () => {
        const success = true;
        const wrapper = setup({success});
        const prop = wrapper.instance().props.success;
        expect(prop).toBe(true);
    });

    test('"guessWord" action creator is a function prop', () => {
        const wrapper = setup();
        const prop = wrapper.instance().props.guessWord;
        expect(prop).toBeInstanceOf(Function);
    });
});

describe('"guessWord" action creator call', () => {
    let guessWordMock;
    let wrapper;
    const guessedWord = 'train';
    
    beforeEach(() => {
        guessWordMock = jest.fn();
        const props = {
            guessWord: guessWordMock
        };

        wrapper = shallow(<UnconnectedInput {...props} />);
        wrapper.setState({ currentGuess: guessedWord });
        const submitButton = findByTestAttr(wrapper, 'submit-button');
        submitButton.simulate('click', { preventDefault(){} });
    });

    test('calls "guessedWord" when button is clicked', () => {
        const guessedWordCallCount = guessWordMock.mock.calls.length;
        expect(guessedWordCallCount).toBe(1);
    });

    test('calls "guessWord" with input value as argument', () => {
        const guessArgument = guessWordMock.mock.calls[0][0];
        expect(guessArgument).toBe(guessedWord);
    });

    test('input box clears on submit', () => {
        expect(wrapper.state('currentGuess')).toBe('');
    });
})