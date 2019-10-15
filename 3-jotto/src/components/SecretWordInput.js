import React, { Component } from 'react';
import { connect } from 'react-redux';

export class UnconnectedSecretWordInput extends Component {

    render(){
        return(
            <div></div>
        )
    };
}

const mapStateFromProps = (state) => {
    const { secretWord } = state;
    return { secretWord };
}

export default connect(mapStateFromProps)(UnconnectedSecretWordInput);