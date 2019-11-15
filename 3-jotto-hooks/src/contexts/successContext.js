import React from 'react';

const successContext = React.createContext();

const useSuccess = () => {
    const context = React.useContext(successContext);

    // if context does not exist, it means that you've tried to use this function outside a 
    // provider
    if(!context){
        throw new Error('useSuccess must be used within a SuccessProvider');
    }

    return context;
};

const SuccessProvider = (props) => {
    const [success, setSuccess] = React.useState(false);

    // use useMemo hook in order to make sure that you're not recalculating this more than 
    // you need to.
    // if the function has the same inputs, it does not recalculate. the function just
    // returns the output that it saved from the previous iteration.
    const value = React.useMemo(() => [success, setSuccess], [success]);
    return(
        <successContext.Provider value={value} {...props}/>
    );
}

export default {SuccessProvider, useSuccess};

