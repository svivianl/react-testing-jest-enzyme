import React, { Component } from 'react';
import { connect } from 'react-redux';
import GuessWords from './GuessWords';
import Congrats from './Congrats';
import Input from './Input';
import Reset from './Reset';
import GiveUp from './GiveUp';
import '../App.css';
import { getSecretWord, resetGame } from '../actions';

export class UnconnectedApp extends Component {

  componentDidMount(){
    this.props.getSecretWord();
  }

  render(){

    return (
      <div className="container">
        <h1>JOTTO</h1>
        <Reset resetGame={this.props.resetGame}/>
        <div>The secret word is {this.props.secretWord}</div>
        <GiveUp 
          giveUp={this.props.giveUp}
          resetGame={this.props.resetGame}
        />
        <Congrats success={this.props.success}/>
        <Input />
        <GuessWords guessedWords={this.props.guessedWords}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord } = state;
  return { success, guessedWords, secretWord };
}
export default connect(mapStateToProps, { getSecretWord, resetGame })(UnconnectedApp);
