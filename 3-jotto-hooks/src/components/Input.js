import React from 'react';
import PropTypes from 'prop-types';
import languageContext from '../context/languageContext';
import stringsModule from '../helpers/strings';
// import { connect } from 'react-redux';
// import { guessWord } from '../actions';

export const UnconnectedInput = ({success, secretWord, guessWord}) => {
    // to use useState on Mock, you cannot destructure it from React
    const [currentGuess, setCurrentGuess] = React.useState('');
    const language = React.useContext(languageContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        // const guessedWord = currentGuess;
        // if(guessedWord && guessedWord.length){
        //     setGuessWord(guessedWord);
            setCurrentGuess('');
        // } 
    }

    return(
        <div data-test='component-input'>
            {/* {!success && ( */}
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
            {/* )} */}
        </div>
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