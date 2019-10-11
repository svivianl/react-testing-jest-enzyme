import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { resetGame } from '../actions';

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
    }
    handleNewWord(e){
        e.preventDefault();
        this.setState({ giveUpSecretWord: '' });
        this.props.resetGame();
    }
  render(){
    return (
        <Fragment>
            {!this.props.success && 
                <button data-test='give-up-button'
                    type='submit'
                    onClick={this.handleGiveUp}
                    className='btn btn-primary mb-2'>
                    Give up
                </button>
            }
            {this.state.giveUpSecretWord && 
                <Fragment>
                    <div data-test='give-up-secret-word'>
                        The secret word was <b>{this.state.giveUpSecretWord}</b>
                    </div>
                    <button data-test='new-word-button'
                        type='submit'
                        onClick={this.handleNewWord}
                        className='btn btn-primary mb-2'>
                        New Word
                    </button>
                </Fragment>
            }
        </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    const { secretWord, success } = state;
    return { secretWord, success };
}
export default connect(mapStateToProps, { resetGame })(UnconnectedGiveUp);
