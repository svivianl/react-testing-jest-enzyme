import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter()});

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props}/>);
  if(state) wrapper.setState(state);
  return wrapper;
}
const findByTestAttr = (wrapper, value) => wrapper.find(`[data-test='${value}']`);

it('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

it('renders increment button', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'increment-button');
  expect(component.length).toBe(1);
});

it('renders counter display', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'counter-display');
  expect(component.length).toBe(1);
});

it('counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

describe('increment button is clicked', () => {
  
  test('increment counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    const display = findByTestAttr(wrapper, 'counter-display');
    expect(display.text()).toContain( counter + 1 );
  });

  test('remove error when increment button is clicked', () => {
    const counter = 0;
    const wrapper = setup(null, { counter });
    const decrement = findByTestAttr(wrapper, 'decrement-button');
    decrement.simulate('click');
    const increment = findByTestAttr(wrapper, 'increment-button');
    increment.simulate('click');
    const display = findByTestAttr(wrapper, 'message');
    expect(display.length).toBe(0);
  });
})

describe('decrement button is clicked', () => {
  
  test('decrement counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    const display = findByTestAttr(wrapper, 'counter-display');
    expect(display.text()).toContain( counter - 1 );
  });
  
  test('cannot go below 0', () => {
    const counter = 0;
    const wrapper = setup(null, { counter });
    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate('click');
    const display = findByTestAttr(wrapper, 'message');
    expect(display.length).toBe(1);
  });
})

