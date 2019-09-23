import React, { Component } from 'react';
import GuessWords from './GuessWords';
import Congrats from './Congrats';
import '../App.css';

class App extends Component {

  render(){

    return (
      <div className="container">
        <h1>JOTTO</h1>
       <Congrats success={true}/>
       <GuessWords guessedWords={[{guessedWord: 'train', letterMatchCount: 3},
        {guessedWord: 'agile', letterMatchCount: 1},
        {guessedWord: 'party', letterMatchCount: 5}]}/>
      </div>
    );
  }
}

export default App;
