import { combineReducers } from 'redux';
import success from './successReducer';
import guessedWords from './guessedWordReducer';
import secretWord from './secretWordReducer';
import giveUp from './giveUpReducer';

export default combineReducers({
    success,
    guessedWords,
    secretWord,
    giveUp
});