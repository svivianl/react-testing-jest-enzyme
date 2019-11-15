import React, { Fragment } from 'react';
import * as actions from '../actions/hookActions';
import languageContext from '../context/languageContext';
import Input from './Input';
import LanguagePicker from './LanguagePicker';
// import GuessWords from './GuessWords';
// import Congrats from './Congrats';
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
            <Input secretWord={state.secretWord}/>
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
      {/* <div>The secret word is {this.props.secretWord}</div>
      <Congrats success={this.props.success}/>
      <GuessWords guessedWords={this.props.guessedWords}/> */}
    </Fragment>
  );
}

export default UnconnectedApp;
