import { getLetterMatchCount } from './';

describe('getLetterMatchCount', () => {

    const secretWord = 'party';

    test('returns correct count when there are no matching letters', () => {
        expect(getLetterMatchCount('bones', secretWord)).toBe(0);
    });

    test('returns correct count when there are 3 matching letters', () => {
        expect(getLetterMatchCount('train', secretWord)).toBe(3);
    });

    test('returns correct count when there are duplicate letters in the guess', () => {
        expect(getLetterMatchCount('parka', secretWord)).toBe(3);
    });
});