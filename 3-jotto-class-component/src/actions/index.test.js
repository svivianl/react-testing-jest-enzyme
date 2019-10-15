import moxios from 'moxios';

// import { actionTypes } from '.';
import { storeFactory } from '../tests/testUtils';
import { getSecretWord } from './';

// describe('correctGuess', () => {
//     test('returns an action with type "CORRECT_GUESS', () => {
//         const action = correctGuess();
//         expect(action).toEqual({ type: actionTypes.CORRECT_GUESS });
//     });
// });

describe('getSecretWord action creator', () => {
    const secretWord = 'party';
    let store;

    beforeEach(() => {
        moxios.install();
        store = storeFactory();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('adds response word to state', () => {
        
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            return request.respondWith({status: 200, response: secretWord});
        });

        return store.dispatch(getSecretWord())
            .then(() => {
                const newState = store.getState();
                expect(newState.secretWord).toBe(secretWord);
            });
    });

    test('when server returns 4xx status', () => {
        const errorResponse = {
            status: 404,
            response: { message: '404 error' }
        }
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            return request.reject(errorResponse);
        });

        return store.dispatch(getSecretWord())
            .catch(e => {
                expect(e).toEqual(errorResponse);
            });
    });
    test('when server returns 5xx status', () => {
        const errorResponse = {
            status: 500,
            response: { message: '500 error' }
        }

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            return request.reject(errorResponse);
        });

        return store.dispatch(getSecretWord())
            .catch(e => {
                expect(e).toEqual(errorResponse);
            });
    });
});