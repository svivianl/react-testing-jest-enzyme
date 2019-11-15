import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from './testUtils';
import guessedWordsContext from '../contexts/guessedWordsContext';

import GuessWords from '../components/GuessedWords';

/* Note:
    wrapping the component into a Provider does not allow us to test the **default** language
*/
const setup = (guessedWords = []) => {
    const mockUseGuessedWords = jest.fn().mockReturnValue([guessedWords, jest.fn()]);
    guessedWordsContext.useGuessedWords = mockUseGuessedWords;
    return shallow(<GuessWords/>)
}

describe('if there are no words with expected props', () => {
    
    let wrapper;
    beforeEach(() => wrapper = setup([]));

    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders instructions to guess a word', () => {
        const instructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(instructions.length).not.toBe(0);
    });
    
    test('does not render "number of guesses"', () => {
        const numberOfGuesses = findByTestAttr(wrapper, 'number-of-guesses');
        expect(numberOfGuesses.length).toBe(0);
    });

    test('does not render guess index', () => {
        const index = findByTestAttr(wrapper, 'guess-index');
        expect(index.length).toBe(0);
    })
});


describe('if there are words guessed', () => {
    
    const guessedWords = [
        {guessedWord: 'train', letterMatchCount: 3},
        {guessedWord: 'agile', letterMatchCount: 1},
        {guessedWord: 'party', letterMatchCount: 5}
    ];

    let wrapper;

    beforeEach(() => wrapper = setup(guessedWords));

    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders "guessed words" section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });

    test('renders correct number of words', () => {
        const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordNodes.length).toBe(guessedWords.length);
    });

    test('renders "number of guesses"', () => {
        const numberOfGuesses = findByTestAttr(wrapper, 'number-of-guesses');
        expect(numberOfGuesses.length).toBe(1);
    });

    test('renders the number of guesses', () => {
        const numberOfGuesses = findByTestAttr(wrapper, 'number-of-guesses');
        expect(numberOfGuesses.text()).toMatch(guessedWords.length.toString());
    });

    test('renders guess indexes', () => {
        const index = findByTestAttr(wrapper, 'guess-index');
        const indexSet = new Set(index.map( wrapper => wrapper.text() ));
        const expectedSet = new Set(guessedWords.map((rows, index) => (index + 1).toString()));
        expect(indexSet).toEqual(expectedSet);
    })
});

describe('languagePicker', () => {
    test('renders guess intructions string in English by defualt', () => {
        const wrapper = setup([]);
        const instructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(instructions.text()).toBe('Try to guess the secret word!')
    });
    test('renders guess instructions string in emoji', () => {
        const mockUseContext = jest.fn().mockReturnValue('emoji');
        React.useContext = mockUseContext;
        const wrapper = setup([]);
        const instructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(instructions.text()).toBe('🤔🤫🔤');
    });
    test('', () => {

    });
});