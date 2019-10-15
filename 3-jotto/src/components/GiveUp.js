import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { giveUpAction, resetGame } from '../actions';

export class UnconnectedGiveUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            giveUpSecretWord: ''
        };
        this.handleGiveUp = this.handleGiveUp.bind(this);
        this.handleNewWord = this.handleNewWord.bind(this);
    }

    handleGiveUp(e){
        e.preventDefault();
        this.setState({ giveUpSecretWord: this.props.secretWord });
        this.props.giveUpAction();
    }

    handleNewWord(e){
        e.preventDefault();
        this.setState({ giveUpSecretWord: '' });
        this.props.resetGame();
    }
  render(){
    return (
        <Fragment>
            {this.props.giveUp ? (
                this.state.giveUpSecretWord && 
                    <Fragment>
                        <div data-test='give-up-secret-word' className='alert alert-danger'>
                            The secret word was <b>{this.state.giveUpSecretWord}</b>
                        </div>
                        <button data-test='new-word-button'
                            type='submit'
                            onClick={this.handleNewWord}
                            className='btn btn-primary mb-2'>
                            New Word
                        </button>
                    </Fragment>
            ) : (
                <button data-test='give-up-button'
                    type='submit'
                    onClick={this.handleGiveUp}
                    className='btn btn-primary mb-2'>
                    Give up
                </button>
            )}
        </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    const { secretWord, success, giveUp } = state;
    return { secretWord, success, giveUp };
}
export default connect(mapStateToProps, { giveUpAction, resetGame })(UnconnectedGiveUp);
