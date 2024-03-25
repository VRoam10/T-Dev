import React, { useEffect, useState } from 'react';
import { CustomModal, ErrorMessage, InputField } from "../../components/general";
import api from "../../API";

const CardContainer = ({ children, card, members, lists, listID, handleReload, handleReloadList }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [cardName, setCardName] = useState("");
    const [listId, setListId] = useState('');
    const [cardsMembers, setCardsMembers] = useState({});
    const [error, setError] = useState(null);
    const cardId = card.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedCardsMembers = {};
                const members = await api.getCardMembers(cardId);
                fetchedCardsMembers[card.id] = members;
                setCardsMembers(fetchedCardsMembers);
            } catch (error) {
                setError(error);
            }
        }
        fetchData();
    }, [card])

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const deleteError = () => {
        setError(null);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.renameCardById(cardId, cardName)
            handleCloseModal();
            setCardName(null);
            handleReload(true);
        } catch (error) {
            setError(error);
        }
    }

    const handleAddMemberToCard = async (cardId, memberId) => {
        try {
            await api.addMemberToCard(cardId, memberId)
            handleReload(true);
        } catch (error) {
            setError(error);
        }
    }

    const handleRemoveMemberToCard = async (event, cardId, memberId) => {
        event.stopPropagation();
        try {
            await api.removeMemberFromCard(cardId, memberId)
            handleReload(true);
        } catch (error) {
            setError(error);
        }
    }

    const handleDeleteCard = async () => {
        try {
            await api.deleteCard(cardId)
            handleCloseModal();
            handleReload(true);
        } catch (error) {
            setError(error);
        }
    }

    const handleMoveCard = async (event, cardId) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            await api.moveCardToList(cardId, listId)
            handleReloadList(true)
            handleCloseModal();
        } catch (error) {
            setError(error);
        }
    }

    return (
        <>
            <div onClick={handleOpenModal} className="items-start pt-4 pr-16 pb-32 pl-5 mt-2.5 whitespace-nowrap bg-white rounded-3xl shadow-lg max-md:pr-5 max-md:pb-10">
                <div>{children}</div>
                {cardsMembers[cardId] && cardsMembers[cardId].length >= 1 && (
                    <div>
                        <p>Members:</p>
                        <ul>
                            {cardsMembers[cardId].map((member, indexAlreadyMember) => (
                                <li key={indexAlreadyMember}>{member.fullName}
                                    <button style={{ marginLeft: '1vw' }}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                        onClick={(event) => handleRemoveMemberToCard(event, cardId, member.id)}>
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
                <form
                    onSubmit={handleSubmit}
                    className="box-border flex relative flex-col shrink-0 space-y-6"
                >
                    <select onChange={async (e) => {
                        await handleAddMemberToCard(cardId, e.target.value);
                    }}>
                        <option value={null}>add member to this card</option>
                        {members && cardsMembers[cardId] && members
                            .filter(member => !cardsMembers[cardId].some(cardsMember => cardsMember.id === member.id))
                            .map((member, indexMember) => (
                                <option key={indexMember} value={member.id}>
                                    {member.fullName}
                                </option>
                            ))}
                    </select>
                    <select onChange={(e) => setListId(e.target.value)}>
                        <option value={null}>Select a list</option>
                        {lists && lists.length >= 1 && lists
                            .filter((list) => list.id !== listID)
                            .map((list) => (
                                <option key={list.id} value={list.id}>{list.name}</option>
                            ))}
                    </select>
                    <button onClick={(event) => handleMoveCard(event, cardId)}>Move it</button>
                    <InputField
                        id="Card-Name"
                        label="Card Name"
                        value={cardName}
                        onChange={(event) => setCardName(event.target.value)}
                    />

                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Send
                    </button>
                    <button
                        onClick={handleDeleteCard}
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Delete
                    </button>
                </form>
            </CustomModal>
            {error && <ErrorMessage message={`${error}`} onClose={deleteError} />}
        </>
    )
}

export default CardContainer;