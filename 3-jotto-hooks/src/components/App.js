import React, { Component } from 'react';
import GuessWords from './GuessWords';
import Congrats from './Congrats';
import '../App.css';

export class UnconnectedApp extends Component {

  render(){

    return (
      <div className="container">
        <h1>JOTTO</h1>
        <div>The secret word is {this.props.secretWord}</div>
        <Congrats success={this.props.success}/>
        <GuessWords guessedWords={this.props.guessedWords}/>
      </div>
    );
  }
}

export default UnconnectedApp;
