import React from 'react';
import languageContext from '../contexts/languageContext';
import guessedWordsContext from '../contexts/guessedWordsContext';
import stringsModule from '../helpers/strings';

const GuessWords = () => {
    const [guessedWords] = guessedWordsContext.useGuessedWords();
    const language = React.useContext(languageContext);

    return (
        <div data-test='component-guessed-words'>
            {guessedWords.length ? (
                <div data-test='guessed-words'>
                    <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
                    <table className='table table-sm'>
                        <thead className='thead-light'>
                            <tr>
                                <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
                                <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
                                <th>Index</th>
                            </tr>
                        </thead>
                        <tbody>
                            {guessedWords.map((word, index) => (
                                <tr data-test='guessed-word' key={index}>
                                    <td>{word.guessedWord}</td>
                                    <td>{word.letterMatchCount}</td>
                                    <td data-test='guess-index'>{index + 1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div data-test='number-of-guesses'>Number of guesses: {guessedWords.length}</div>
                </div>
            ) : (
                <span data-test='guess-instructions'>{stringsModule.getStringByLanguage(language, 'guessPrompt')}</span>
            )}
        </div>
    )
}

export default GuessWords;