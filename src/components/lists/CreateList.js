import React from 'react';
import api from "../../API";

const InputCreateList = ({ boardId, handleReload }) => {
    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            console.log("enter enter here !");
            try {
                await api.createList(boardId, event.target.value)
                handleReload(true);
            } catch (error) {
                console.error('Error while creating list:', error)
            }
        }
    }

    return (
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col p-2.5 mx-auto w-full text-2xl text-black rounded-3xl shadow-lg bg-black bg-opacity-50 max-md:mt-10">
                <input className="flex gap-5 justify-between py-1.5 pr-1 pl-4 bg-white rounded-3xl shadow-lg" onKeyDown={handleKeyPress} placeholder='Create List' />
            </div>
        </div>
    )
}

export default InputCreateList;