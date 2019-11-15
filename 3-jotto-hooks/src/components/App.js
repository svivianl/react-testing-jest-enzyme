import React, { Fragment } from 'react';
import * as actions from '../actions/hookActions';
import guessedWordsContext from '../contexts/guessedWordsContext';
import languageContext from '../contexts/languageContext';
import successContext from '../contexts/successContext';
import Input from './Input';
import LanguagePicker from './LanguagePicker';
import Congrats from './Congrats';
import GuessWords from './GuessedWords';
import '../App.css';

const reducer = (state, action) => {
  switch(action.type){
    case 'setSecretWord':
      return {...state, secretWord: action.payload};
    case 'setLanguage':
      return {...state, language: action.payload};
    default:
      return state;
  }
}

export const UnconnectedApp = () => {
  const [state, dispatch] = React.useReducer( reducer, {secretWord: null});
  
  React.useEffect(() => {
    actions.getSecretWord(setSecretWord)
  },[]);
  
  const setSecretWord = (secretWord) => dispatch({type: 'setSecretWord', payload: secretWord});
  const setLanguage = (language) => dispatch({type: 'setLanguage', payload: language});
  
  return (
    <Fragment>
      {state.secretWord ? (
        <div data-test='component-app' className="container">
          <h1>JOTTO</h1>
          <languageContext.Provider value={state.language}>
            <LanguagePicker setLanguage={setLanguage}/>
            <guessedWordsContext.GuessedWordsProvider>
              <successContext.SuccessProvider>
                <Congrats/>
                <Input secretWord={state.secretWord}/>
                <div>The secret word is {state.secretWord}</div>
              </successContext.SuccessProvider>
              <GuessWords/>
            </guessedWordsContext.GuessedWordsProvider>
          </languageContext.Provider>
        </div>
      ):(
        <div data-test='component-spinner' className='spinner'>
          <div className='spinner-border' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
          <p>Loading secret word</p>
        </div>
      )}
    </Fragment>
  );
}

export default UnconnectedApp;
