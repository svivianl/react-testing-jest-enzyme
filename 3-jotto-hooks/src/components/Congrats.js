import React from 'react';
import languageContext from '../contexts/languageContext';
import successContext from '../contexts/successContext';
import stringsModule from '../helpers/strings';

const Congrats = () => {
    const [success] = successContext.useSuccess();
    const language = React.useContext(languageContext);

    return (
        <div data-test='component-congrats' className={success ? 'alert alert-success' : undefined}>
            {success && (
                <span data-test='congrats-message'>
                    {stringsModule.getStringByLanguage(language, 'congrats')}
                </span>
            )}
        </div>
    )
}

export default Congrats;