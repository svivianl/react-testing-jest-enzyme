import React from 'react';
import PropTypes from 'prop-types';
import languageContext from '../context/languageContext';
import stringsModule from '../helpers/strings';

const Congrats = (props) => {
    const language = React.useContext(languageContext);

    return (
        <div data-test='component-congrats' className={props.success ? 'alert alert-success' : undefined}>
            {props.success && (
                <span data-test='congrats-message'>
                    {stringsModule.getStringByLanguage(language, 'congrats')}
                </span>
            )}
        </div>
    )
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired,
};

export default Congrats;