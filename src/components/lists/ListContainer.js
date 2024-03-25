import React, { useEffect, useRef, useState } from 'react';
import { CustomModal, ErrorMessage, InputField } from "../../components/general";
import { CardContainer } from '../../components/cards';
import api from "../../API";

const ListOptionsDropdownMenu = ({ listId, handleReload }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [listName, setListName] = useState("");

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.renameListById(listId, listName)
            handleCloseModal();
            setListName(null);
            handleReload(true);
        } catch (error) {
            console.error('Error while renaming list:', error)
        }
    }

    const handleDeleteList = async () => {
        try {
            await api.archiveList(listId)
            handleReload(true);
        } catch (error) {
            console.error('Error while deleting list:', error)
        }
    }

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (dropdownRef.current && !dropdownRef.current.contains(event.target))
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="rounded-full shadow-lg bg-zinc-300 hover:bg-zinc-400 h-[30px] w-[30px]"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    fill="none"
                    class="w-5 h-5 text-black pr-2"
                    style={{ transform: "rotate(180deg)" }}
                >
                    <path
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                        stroke-width="2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                    ></path>
                </svg>
            </button>
            {isOpen && (
                <ul className={`z-40 absolute top-full mt-2 py-2 w-48 bg-white text-black shadow-xl rounded-md ${!document.documentElement.clientWidth || window.innerWidth > document.documentElement.clientWidth - dropdownRef.current.getBoundingClientRect().right ? 'right-0' : 'left-0'}`}>
                    <li className="px-4 py-2 hover:bg-blue-100 cursor-pointer" onClick={handleOpenModal}>
                        Modifier
                    </li>
                    <li className="px-4 py-2 bg-red-600 hover:bg-red-800 cursor-pointer" onClick={handleDeleteList}>Delete</li>
                </ul>
            )}
            <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                <form
                    onSubmit={handleSubmit}
                    className="box-border flex relative flex-col shrink-0 space-y-6"
                >
                    <InputField
                        id="List-Name"
                        label="List Name"
                        value={listName}
                        onChange={(event) => setListName(event.target.value)}
                    />

                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Send
                    </button>
                </form>
            </CustomModal>
        </div>
    );
};

function ListContainer({ list, members, lists, handleReload }) {
    const [error, setError] = useState(null);
    const [cards, setCards] = useState({});
    const [cardLoad, setLoadCard] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch cards and their members
                const fetchedCards = {};
                const cards = await api.getAllCardsFromList(list.id);
                fetchedCards[list.id] = cards;
                setCards(fetchedCards);
                setLoadCard(false);
            } catch (error) {
                setError(error);
            }
        };

        fetchData();
    }, [cardLoad, list.id]);

    const handleCreateCard = async (listId, name, desc) => {
        try {
            await api.createCard(listId, name, desc);
            handleReload(true);
        } catch (error) {
            setError(error);
        }
    };

    const deleteError = () => {
        setError(null);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            console.log("enter enter here !");
            handleCreateCard(list.id, event.target.value, "");
            setLoadCard(true);
            event.target.value = "";
        }
    };

    return (
        <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col p-2.5 mx-auto w-full text-2xl text-black rounded-3xl shadow-lg bg-black bg-opacity-50 max-md:mt-10">
                <div className="flex gap-5 justify-between text-white whitespace-nowrap">
                    <div>{list.name}</div>
                    <ListOptionsDropdownMenu handleReload={handleReload} listId={list.id} />
                </div>
                {cards[list.id] &&
                    cards[list.id].length >= 1 &&
                    cards[list.id].map((card) => (
                        <CardContainer handleReload={setLoadCard} key={card.id} card={card} members={members} lists={lists} listID={list.id} handleReloadList={handleReload}>
                            {card.name}
                        </CardContainer>
                    ))}
                <input className="flex gap-5 justify-between py-1.5 pr-1 pl-4 mt-2.5 bg-white rounded-3xl shadow-lg" onKeyDown={handleKeyPress} placeholder='Create Card' />
                {error && <ErrorMessage message={`${error}`} onClose={deleteError} />}
            </div>
        </div>
    );
}

export default ListContainer;