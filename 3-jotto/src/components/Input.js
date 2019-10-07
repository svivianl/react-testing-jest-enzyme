import React, { Component } from 'react';
import { connect } from 'react-redux';
import { guessWord } from '../actions';

export class UnconnectedInput extends Component{
    
    constructor(props){
        super(props);
        this.state = { currentGuess: null };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const guessedWord = this.state.currentGuess;
        if(guessedWord && guessedWord.length){
            this.props.guessWord(guessedWord);
            this.setState({ currentGuess: '' });
        } 
    }
    render(){
        return(
            <div data-test='component-input'>
                {!this.props.success && (
                    <forn className='form-inline'>
                        <input data-test='input-box'
                            className='mb-2 mx-sm=3'
                            type='text'
                            value={this.state.currentGuess}
                            onChange={ e => this.setState({ currentGuess: e.target.value })}
                            placeholder='enter guess'/>
                        <button data-test='submit-button'
                            type='submit'
                            onClick={e => this.handleSubmit(e)}
                            className='btn btn-primary mb-2'>
                            Submit
                        </button>
                    </forn>
                )}
            </div>
        )
    }
}

const mapStateToProps = ({ success }) => {
    return { success };
}

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);