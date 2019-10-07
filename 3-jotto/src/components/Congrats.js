import React from 'react';
import PropTypes from 'prop-types';

const Congrats = (props) => {
    return (
        <div data-test='component-congrats' className={props.success ? 'alert alert-success' : undefined}>
            {props.success && (
                <span data-test='congrats-message'>
                    Congradulations! You guessed the word!
                </span>
            )}
        </div>
    )
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired,
};

export default Congrats;