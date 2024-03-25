import React, { useEffect, useRef, useState } from 'react';

function InputField({
        id,
        label,
        type = "text",
        value,
        onChange,
    }) {
    return (
        <>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                className="flex gap-5 justify-between py-1.5 border-solid border-2 border-black pr-1 pl-4 mt-2.5 bg-white rounded-3xl shadow-lg"
            />
        </>
    );
}

export default InputField;