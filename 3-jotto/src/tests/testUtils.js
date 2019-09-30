import Enzyme, { shallow } from 'enzyme';
import checkPropTypes from 'check-prop-types';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducers';
import { middlewares } from '../../src/configureStore';

export const findByTestAttr = (wrapper, value) => wrapper.find(`[data-test='${value}']`);

export const checkProps = (component, confirmingProps) => {
    const propError = checkPropTypes(component.propTypes, confirmingProps, 'prop', component.name);
    expect(propError).toBeUndefined();
}

export const storeFactory = initialState => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
}