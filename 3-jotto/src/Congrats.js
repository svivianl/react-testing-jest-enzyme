import React from 'react';
import PropTypes from 'prop-types';

const Congrats = (props) => {
    return (
        <div>
            <div data-test='component-congrats'>
                {props.success && (
                    <span data-test='congrats-message'>
                        Congradulations! You guessed the word!
                    </span>
                )}
            </div>
        </div>
    )
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired,
};

export default Congrats;