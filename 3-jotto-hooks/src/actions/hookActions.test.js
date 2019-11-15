import moxios from 'moxios';
import { getSecretWord } from './hookActions';

describe('moxios tests', () => {
    beforeEach(() => {
        moxios.install();
    });
    
    afterEach(() => {
        moxios.uninstall();
    });

    test('call the getSecretWord action on axios response', async() => {
        const secretWord = 'party';

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: secretWord
            });
        });

        const mockSetSecretWord = jest.fn();
        await getSecretWord(mockSetSecretWord);

        // check if mock was run with the correct secret word
        expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
    });
});