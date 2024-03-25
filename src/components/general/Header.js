import React, { useEffect, useRef, useState } from 'react';
import CustomModal from './CustomModal';

const ReturnButton = (props) => {

    const onBackButtonClick = () => {
        window.location.pathname="figma1"
    };

    return (
        <button
        className={`flex gap-2.5 justify-between px-2.5 py-2.5 rounded-3xl border border-white hover:bg-white hover:text-black border-solid ${props.isBoard ? '' : 'invisible'}`}
        onClick={onBackButtonClick}
        >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 5 24 24"
        stroke="currentColor"
        fill="none"
        class="w-5 h-5"
        style={{ transform: "rotate(180deg)" }}
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
        Retour aux Tableaux
    </button>
    )
}

const UserOptionsButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    const handleDisconnect = async () => {
        window.Trello.deauthorize();
        sessionStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="relative" ref={dropdownRef}>
        <button
            className="justify-center px-3.5 py-2.5 bg-indigo-600 rounded-[90px] hover:bg-blue-900"
            onClick={toggleDropdown}
        >
            Name
        </button>
        {isOpen && (
            <ul
            className={`z-40 absolute top-full mt-2 py-2 w-48 bg-white text-black shadow-xl rounded-md ${
                !document.documentElement.clientWidth ||
                window.innerWidth > document.documentElement.clientWidth - dropdownRef.current.getBoundingClientRect().right
                ? 'right-0'
                : 'left-0'
            }`}
            >
            <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={handleOpenModal}>
                Modifier
            </li>
            <li className="px-4 py-2 bg-red-600 hover:bg-red-800 cursor-pointer" onClick={handleDisconnect}>
                Se déconnecter
            </li>
            </ul>
        )}
            <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
            This is an alert! Click outside the modal to close.
            </CustomModal>
        </div>
    );
};

const BoardName = ({boardInfo}) => {
    return(
        <>
            {boardInfo && <div>{boardInfo.name}</div>}
        </>
    )
}

const Header = (props) => {
    return (
        <div className="flex gap-5 justify-between px-5 py-2.5 w-full text-xl font-medium text-center text-white whitespace-nowrap bg-black max-md:flex-wrap max-md:max-w-full">
            <ReturnButton isBoard={props.isBoard}/>
            <BoardName boardInfo={props.boardInfo}/>
            <UserOptionsButton/>
        </div>
    )
}

export default Header;