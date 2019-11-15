import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import guessedWordsContext from '../contexts/guessedWordsContext';
import languageContext from '../contexts/languageContext';
import successContext from '../contexts/successContext';
import stringsModule from '../helpers/strings';
import { getLetterMatchCount } from '../helpers';

export const UnconnectedInput = ({secretWord}) => {
    // to use useState on Mock, you cannot destructure it from React
    const [currentGuess, setCurrentGuess] = React.useState('');
    const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
    const [success, setSuccess] = successContext.useSuccess();
    const language = React.useContext(languageContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
        const guessedWord = {guessedWord: currentGuess, letterMatchCount};
        if(currentGuess === secretWord){
            setSuccess(true);
        }
        if(currentGuess && currentGuess.length){
            setGuessedWords([...guessedWords, guessedWord]);
        } 
        setCurrentGuess('');
    }

    return(
        <Fragment>
            {success ? null :
                <div data-test='component-input'>
                    <form className='form-inline'>
                        <input data-test='input-box'
                            className='mb-2 mx-sm=3'
                            type='text'
                            value={currentGuess}
                            onChange={ e => setCurrentGuess(e.target.value)}
                            placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}/>
                        <button data-test='submit-button'
                            type='submit'
                            onClick={e => handleSubmit(e)}
                            className='btn btn-primary mb-2'>
                            {stringsModule.getStringByLanguage(language, 'submit')}
                        </button>
                    </form>
                </div>
            }
        </Fragment>
    )
}


// const mapStateToProps = ({ success }) => {
//     return { success };
// }

UnconnectedInput.propTypes = {
    secretWord: PropTypes.string.isRequired
}

export default UnconnectedInput;
// export default connect(mapStateToProps, { guessWord })(UnconnectedInput);