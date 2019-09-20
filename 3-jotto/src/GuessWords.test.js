import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';

import GuessWords from './GuessWords';

const defaultProps = {
    guessedWords: [
        {guessedWord: 'train', letterMatchCount: 3}
    ]
}

const setup = (props = defaultProps) => shallow(<GuessWords {...props}/>);

test('does not throw warning with expected props', () => {
    checkProps(GuessWords, defaultProps);
});

describe('if there are no words with expected props', () => {
    
    let wrapper;
    beforeEach(() => wrapper = setup({guessedWords: []}));

    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders instructions to guess a word', () => {
        const instructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(instructions.length).not.toBe(0);
    });
    
});


describe('if there are words guessed', () => {
    
    const guessedWords = [
        {guessedWord: 'train', letterMatchCount: 3},
        {guessedWord: 'agile', letterMatchCount: 1},
        {guessedWord: 'party', letterMatchCount: 5}
    ];

    let wrapper;

    beforeEach(() => wrapper = setup({ guessedWords }));

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
});


// describe('', () => {

//     // test('', () => {
    
//     // });
// });

// describe('', () => {

//     // test('', () => {
    
//     // });
// });
// test('', () => {

// });

// test('', () => {

// });

// test('', () => {

// });

// test('', () => {

// });

// test('', () => {

// });