import { storeFactory } from './testUtils';
import { guessWord, resetGame, giveUpAction } from '../actions';

describe('guessedWord action dispatcher', () => {
    const secretWord = 'party';
    const unsuccessfulGuess = 'train';

    describe('no guessed words', () => {
        let store;
        const initialState = { secretWord }
        beforeEach(() => {
            store = storeFactory(initialState);
        });

        test('updates state correctly for unsuccessful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const newState = store.getState();
            const expectedState = {
                ...initialState,
                success: false,
                guessedWords: [{
                    guessedWord: unsuccessfulGuess,
                    letterMatchCount: 3
                }],
                giveUp: false
            }
            expect(newState).toEqual(expectedState);
        });
        test('updates state correctly for successful guess', () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState = {
                ...initialState,
                success: true,
                guessedWords: [{
                    guessedWord: secretWord,
                    letterMatchCount: secretWord.length
                }],
                giveUp: false
            }
            expect(newState).toEqual(expectedState);
        });
    });

    describe('some guessed words', () => {
        const guessedWords = [ {guessedWord: 'agile', letterMatchCount: 1} ];
        const initialState = { guessedWords, secretWord };
        let store;
        
        beforeEach(() => {
            store = storeFactory(initialState);
        });

        test('updates state correctly for unsuccessful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                success: false,
                guessedWords: [...guessedWords, {guessedWord: unsuccessfulGuess, letterMatchCount: 3}],
                giveUp: false
            }
            expect(newState).toEqual(expectedState);
        });
        test('updates state correctly for successful guess', () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState = {
                secretWord,
                success: true,
                guessedWords: [...guessedWords, {guessedWord: secretWord, letterMatchCount: secretWord.length}],
                giveUp: false
            }
            expect(newState).toEqual(expectedState);
        });
    });
});

describe('Reset action', () => {
    const secretWord = 'party';
    let newState;

    describe('after a successful guess', () => {
        beforeEach( async () => {
            const guessedWords = [ 
                {guessedWord: 'agile', letterMatchCount: 1},  
                {guessedWord: 'party', letterMatchCount: 5},  
            ];
            const initialState = { guessedWords, secretWord, success: true };
            const store = storeFactory(initialState);
            await store.dispatch(resetGame());
            newState = store.getState();
        });
        test('updates secretWord', () => {
            expect(newState.secretWord).not.toBe(secretWord);    
        });
        test('updates success to be false', () => {
            expect(newState.success).toBe(false);    
        });
        test('updates guessedWords', () => {
            expect(newState.guessedWords).toEqual([]);    
        });
        test('updates giveUp', () => {
            expect(newState.giveUp).toEqual(false);    
        });
    });
    describe('before a successful guess', () => {
        beforeEach(async () => {
            const guessedWords = [ 
                {guessedWord: 'agile', letterMatchCount: 1},
            ];
            const initialState = { guessedWords, secretWord, success: false };
            const store = storeFactory(initialState);
            await store.dispatch(resetGame());
            newState = store.getState();
        });
        test('updates secretWord', () => {
            expect(newState.secretWord).not.toBe(secretWord);    
        });
        test('updates success to be false', () => {
            expect(newState.success).toBe(false);    
        });
        test('updates guessedWords', () => {
            expect(newState.guessedWords).toEqual([]);    
        });
        test('updates giveUp', () => {
            expect(newState.giveUp).toEqual(false);    
        });
    });
});

test('Give up action', () => {
    const secretWord = 'party';

    const guessedWords = [ 
        {guessedWord: 'agile', letterMatchCount: 1},  
        {guessedWord: 'party', letterMatchCount: 5},  
    ];
    const initialState = { guessedWords, secretWord, success: false, giveUp: false };
    const expectedState = { guessedWords, secretWord, success: false, giveUp: true };
    const store = storeFactory(initialState);
    store.dispatch(giveUpAction());
    const newState = store.getState();
    expect(newState).toEqual(expectedState);    
});
