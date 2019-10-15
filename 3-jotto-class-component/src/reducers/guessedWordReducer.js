import { actionTypes } from '../actions';

export default (state=[], action) => {
    switch(action.type){
        case actionTypes.GUESS_WORD:{
            // const{ guessedWords } = state;
            // const newGuessedWords = guessedWords && [...guessedWords, action.payload] ;
            // return [...state, newGuessedWords];
            return [...state, action.payload];
        }
        case actionTypes.RESET_GAME:{
            return [];
        }
        default:{
            return state;
        }
    }
}