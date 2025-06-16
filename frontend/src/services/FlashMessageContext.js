import React, { createContext, useContext, useState } from 'react';

const FlashMessageContext = createContext();

export function useFlashMessage() {
    return useContext(FlashMessageContext);
}

export function FlashMessageProvider({ children }) {
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success'); // 'success' | 'error'

    const showMessage = (msg, msgType = 'success') => {
        setMessage(msg);
        setType(msgType);
        setTimeout(() => setMessage(''), 4000); // auto-hide after 4s
    };

    return (
        <FlashMessageContext.Provider value={{ message, type, showMessage }}>
            {children}
        </FlashMessageContext.Provider>
    );
}
