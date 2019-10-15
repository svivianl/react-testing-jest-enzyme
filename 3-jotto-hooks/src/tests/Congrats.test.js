import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from './testUtils';
import Congrats from '../components/Congrats';

const defaultProps = {
    success: false
};

const setup = (props = defaultProps) => shallow(<Congrats {...props}/>);

test('renders without error', () => { 
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
});

test('renders no text when SUCCESS prop is false', () => {
    const wrapper = setup({success: false});
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
});

test('renders no-empty congrats message when SUCCESS prop is true', () => {
    const wrapper = setup({success: true});
    const component = findByTestAttr(wrapper, 'congrats-message');
    expect(component.text().length).not.toBe(0);
});

test('does not throw warning with expected props', () => {
    const expectedProps = {success: false};
    checkProps(Congrats, expectedProps);
});
