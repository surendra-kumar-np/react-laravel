import React from 'react';
import { useFlashMessage } from '../services/FlashMessageContext';

export default function FlashMessage() {
    const { message, type } = useFlashMessage();

    if (!message) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            padding: '10px 30px',
            background: type === 'success' ? '#4caf50' : '#f44336',
            color: '#fff',
            borderRadius: 4,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}>
            {message}
        </div>
    );
}
