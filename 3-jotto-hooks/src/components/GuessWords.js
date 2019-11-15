import React from 'react';
import PropTypes from 'prop-types';
import languageContext from '../context/languageContext';
import stringsModule from '../helpers/strings';

const GuessWords = (props) => {
    const language = React.useContext(languageContext);

    return (
        <div data-test='component-guessed-words'>
            {props.guessedWords.length ? (
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
                            {props.guessedWords.map((word, index) => (
                                <tr data-test='guessed-word' key={index}>
                                    <td>{word.guessedWord}</td>
                                    <td>{word.letterMatchCount}</td>
                                    <td data-test='guess-index'>{index + 1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div data-test='number-of-guesses'>Number of guesses: {props.guessedWords.length}</div>
                </div>
            ) : (
                <span data-test='guess-instructions'>{stringsModule.getStringByLanguage(language, 'guessPrompt')}</span>
            )}
        </div>
    )
}

GuessWords.propTypes = {
    guessedWords: PropTypes.arrayOf(
        PropTypes.shape({
            guessedWord: PropTypes.string.isRequired,
            letterMatchCount: PropTypes.number.isRequired
        })
    ).isRequired
};

export default GuessWords;