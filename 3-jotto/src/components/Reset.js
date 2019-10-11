import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetGame } from '../actions';

export class UnconnectedReset extends Component {

  constructor(props){
    super(props);
    this.handleReset = this.handleReset.bind(this);
  }
  handleReset(e){
    e.preventDefault();
    this.props.resetGame();
  }
  render(){

    return (
        <button data-test='reset-button'
            type='submit'
            onClick={this.handleReset}
            className='btn btn-primary mb-2'>
            Reset
        </button>
    );
  }
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps, { resetGame })(UnconnectedReset);
