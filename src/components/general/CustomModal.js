import React, { useState, useEffect, useRef } from 'react';

const CustomModal = ({ isOpen, onRequestClose, children }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onRequestClose();
            }
        };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [onRequestClose]);
  
    return (
        isOpen && (
            <>
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"></div>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div ref={modalRef} className="bg-white text-black rounded-md shadow-xl p-4">
                        {children}
                    </div>
                </div>
            </>
        )
    );
};

export default CustomModal;