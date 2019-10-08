import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetGame } from '../actions';

export class UnconnectedReset extends Component {

  render(){

    return (
        <button data-test='reset-button'
            type='submit'
            onClick={e => this.props.resetGame()}
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
