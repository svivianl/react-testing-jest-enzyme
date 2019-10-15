import React, { Component } from 'react';
import { connect } from 'react-redux';
import GuessWords from './GuessWords';
import Congrats from './Congrats';
import Input from './Input';
import Reset from './Reset';
import GiveUp from './GiveUp';
import '../App.css';
import { getSecretWord, resetGame, giveUpAction } from '../actions';

export class UnconnectedApp extends Component {

  componentDidMount(){
    this.props.getSecretWord();
  }

  render(){

    return (
      <div className="container">
        <h1>JOTTO</h1>
        {!this.props.giveUp &&
          <Reset 
            resetGame={this.props.resetGame}
            data-test='reset-component'  
          />
        }
        <div>The secret word is {this.props.secretWord}</div>
        {!this.props.success &&
          <GiveUp 
            giveUpAction={this.props.giveUpAction}
            resetGame={this.props.resetGame}
            data-test='give-up-component'
          />
        }
        <Congrats success={this.props.success}/>
        <Input />
        <GuessWords guessedWords={this.props.guessedWords}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { success, guessedWords, secretWord, giveUp } = state;
  return { success, guessedWords, secretWord, giveUp };
}
export default connect(mapStateToProps, { getSecretWord, resetGame, giveUpAction })(UnconnectedApp);
