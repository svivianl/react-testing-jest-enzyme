import Enzyme, { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';

export const findByTestAttr = (wrapper, value) => wrapper.find(`[data-test='${value}']`);

export const checkProps = (component, confirmingProps) => {
    const propError = checkPropTypes(component.propTypes, confirmingProps, 'prop', component.name);
    expect(propError).toBeUndefined();
}

