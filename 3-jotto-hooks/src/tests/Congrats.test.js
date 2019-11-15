import React from 'react';
import { shallow, mount } from 'enzyme';

import { findByTestAttr, checkProps } from './testUtils';
import languageContext from '../context/languageContext';
import Congrats from '../components/Congrats';

const defaultProps = {
    success: false,
    language: 'en'
};

/* Note:
    wrapping the component into a Provider does not allow us to test the **default** language
*/
const setup = ({language, success}) => mount(
    <languageContext.Provider value={language}>
        <Congrats success={success}/>
    </languageContext.Provider>
);

describe('languagePicker', () => {
    test('renders Congrats string in English', () => {
        const wrapper = setup({...defaultProps, success: true});
        expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
    });
    test('renders Congrats string in emoji', () => {
        const wrapper = setup({success: true, language: 'emoji'});
        expect(wrapper.text()).toBe('🎯🎉');
    });
});

test('renders without error', () => { 
    const wrapper = setup(defaultProps);
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
});

test('renders no text when SUCCESS prop is false', () => {
    const wrapper = setup({...defaultProps, success: false});
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
});

test('renders no-empty congrats message when SUCCESS prop is true', () => {
    const wrapper = setup({...defaultProps, success: true});
    const component = findByTestAttr(wrapper, 'congrats-message');
    expect(component.text().length).not.toBe(0);
});

test('does not throw warning with expected props', () => {
    const expectedProps = {...defaultProps, success: false};
    checkProps(Congrats, expectedProps);
});
