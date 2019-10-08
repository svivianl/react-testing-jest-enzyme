import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

export class UnconnectedGiveUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            giveUpSecretWord: ''
        };
        this.handleGiveUp = this.handleGiveUp.bind(this);
    }
    handleGiveUp(e){
        e.preventDefault();
        this.setState({ giveUpSecretWord: this.props.secretWord });
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
                <div data-test='give-up-secret-word'>
                    The secret word was <b>{this.state.giveUpSecretWord}</b>
                </div>
            }
        </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
    const { secretWord, success } = state;
    return { secretWord, success };
}
export default connect(mapStateToProps)(UnconnectedGiveUp);
