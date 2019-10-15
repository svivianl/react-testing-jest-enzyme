import React from 'react';
import PropTypes from 'prop-types';

const GuessWords = (props) => {
    return (
        <div data-test='component-guessed-words'>
            {props.guessedWords.length ? (
                <div data-test='guessed-words'>
                    <h3>Guessed Words</h3>
                    <table className='table table-sm'>
                        <thead className='thead-light'>
                            <tr><th>Guess</th><th>Match</th><th>Index</th></tr>
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
                <span data-test='guess-instructions'>Try to guess the secret word!</span>
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