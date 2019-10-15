import { actionTypes } from '../actions';
import giveUpReducer from '../reducers/giveUpReducer';

test('returns default initial state of "false" when no action is passed', () => {
    expect(giveUpReducer(undefined, {})).toBe(false);
});

test('returns state of "true" upon receiving an action of type "CORRECT_GUESS"', () => {
    // initial state is undefined
    expect(giveUpReducer(undefined, { type: actionTypes.GIVE_UP })).toBe(true);
});