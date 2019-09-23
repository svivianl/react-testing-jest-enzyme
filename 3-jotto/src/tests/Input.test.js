import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, storeFactory } from './testUtils';
import Input from '../components/Input';

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

describe('update', () => {
    test('', () => {

    });

    test('', () => {

    });

    test('', () => {

    });
});

