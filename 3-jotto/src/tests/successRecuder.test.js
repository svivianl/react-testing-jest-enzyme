import { actionTypes } from '../actions';
import successReducer from '../reducers/successReducer';

test('returns default initial state of "false" when no action is passed', () => {
    expect(successReducer(undefined, {})).toBe(false);
});

test('returns state of "true" upon receiving an action of type "CORRECT_GUESS"', () => {
    // initial state is undefined
    expect(successReducer(undefined, { type: actionTypes.CORRECT_GUESS })).toBe(true);
});