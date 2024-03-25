import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message, onClose }) => {
    const errorMessageRef = useRef(null);

    const handleClickOutside = (event) => {
        if (errorMessageRef.current && !errorMessageRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div ref={errorMessageRef} className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded-md">
            {message}
        </div>
    );
};

    ErrorMessage.propTypes = {
        message: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    };

export default ErrorMessage;