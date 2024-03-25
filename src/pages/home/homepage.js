import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from "../../API";

const Homepage = () => {
    const id = useLocation().pathname.slice(1);
    const [lists, setLists] = useState([]);
    const [cardName, setCardName] = useState('');
    const [cardDesc, setCardDesc] = useState('');
    const [cards, setCards] = useState({});
    const [boardInfos, setBoardInfos] = useState({});
    const [listName, setListName] = useState('');
    const [boardName, setBoardName] = useState('');
    const [members, setMembers] = useState([]);
    const [cardsMembers, setCardsMembers] = useState({})
    const [listId, setListId] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch lists
                const fetchedLists = await api.getAllLists(id);
                setLists(fetchedLists);

                // Fetch cards and their members
                const fetchedCards = {};
                const fetchedCardsMembers = {};
                for (let i = 0; i < fetchedLists.length; i++) {
                    const cards = await api.getAllCardsFromList(fetchedLists[i].id);
                    fetchedCards[fetchedLists[i].id] = cards;
                    for (let j = 0; j < cards.length; j++) {
                        const members = await api.getCardMembers(cards[j].id);
                        fetchedCardsMembers[cards[j].id] = members;
                    }
                }
                setCards(fetchedCards);
                setCardsMembers(fetchedCardsMembers);

                // Fetch board information
                const boardInfo = await api.getBoardById(id);
                setBoardInfos(boardInfo);

                // Fetch organization members
                const organizationId = sessionStorage.getItem('organization');
                const fetchedMembers = await api.getOrganizationMembers(organizationId);
                setMembers(fetchedMembers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData()
        //console.log((cards[lists[0].id]))
    }, [id]);


    const handleCreateCard = async (listId, name, desc) => {
        try {
            await api.createCard(listId, name, desc);
            window.location.reload();
        } catch (error) {
            console.error('Error while creating Card:', error);
        }
    };

    const handleDeleteBoard = async (boardid) => {
        try {
            await api.deleteBoard(boardid)
            window.location.href = "/none"
        } catch (error) {
            console.error('Error while deleting board:', error)
        }
    }

    const handleDeleteCard = async (cardId) => {
        try {
            await api.deleteCard(cardId)
            window.location.reload();
        } catch (error) {
            console.error('Error while deleting card:', error)
        }
    }

    const handleDeleteList = async (listId) => {
        try {
            await api.archiveList(listId)
            window.location.reload()
        } catch (error) {
            console.error('Error while deleting list:', error)
        }
    }

    const handleCreateList = async () => {
        try {
            await api.createList(id,listName)
            window.location.reload()
        } catch (error) {
            console.error('Error while creating list:', error)
        }
    }

    const handleRenameBoard = async (boardId) => {
        try {
            await api.renameBoardById(boardId, boardName)
            window.location.reload()
        } catch (error) {
            console.error('Error while renaming board:', error)
        }
    }

    const handleRenameCard = async (cardId) => {
        try {
            await api.renameCardById(cardId, cardName)
            window.location.reload()
        } catch (error) {
            console.error('Error while renaming card:', error)
        }
    }

    const handleRenameList = async (listId) => {
        try {
            await api.renameListById(listId, listName)
            window.location.reload()
        } catch (error) {
            console.error('Error while renaming list:', error)
        }
    }

    const handleAddMemberToCard = async (cardId, memberId) => {
        try {
            await api.addMemberToCard(cardId, memberId)
            window.location.reload()
        } catch (error) {
            console.error('Error while assign a member from a card:', error)
        }
    }

    const handleRemoveMemberToCard = async (cardId, memberId) => {
        try {
            await api.removeMemberFromCard(cardId, memberId)
            window.location.reload()
        } catch (error) {
            console.error('Error while deleting a member from a card:', error)
        }
    }

    const handleMoveCard = async (cardId) => {
        try {
            await api.moveCardToList(cardId, listId)
            window.location.reload()
        } catch (error) {
            console.error('Error while deleting a member from a card:', error)
        }
    }

    return (
        <div style={{borderTop:'solid',padding:'1%'}}>
            <div style={{marginBottom:"3vh", display:"flex", justifyContent: "space-around"}}>
                <div><input style={{marginRight:"2vw", border: 'solid', borderRadius: 10, paddingLeft: '0.5vw', paddingRight: '0.5vw',}}
                type="text" onChange={(e) => setBoardName(e.target.value)}/>
                <button className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => handleRenameBoard(id)}>
                    Rename board : {boardInfos.name}
                </button></div>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => handleDeleteBoard(id)}>
                    Delete board : {boardInfos.name}
                </button>
            </div>
            <div style={{display:'flex', justifyContent: 'center', margin:20}}>
                <input style={{
                            border: 'solid', borderRadius: 10, color:"black",
                            paddingLeft: '0.5vw', paddingRight: '0.5vw', marginRight:'2%'
                        }}type="text" placeholder="New list name"
                    onChange={(e) => (setListName(e.target.value))}
                />
                <button className={"bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"}
                        onClick={() => handleCreateList()}>
                    Create
                </button>
            </div>
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                {lists && lists.length >= 1 && lists.map((list, indexList) => (
                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full" key={indexList}>
                        <div
                            className="flex flex-col p-2.5 mx-auto w-full text-2xl rounded-none shadow-sm bg-black bg-opacity-50 max-md:mt-10">
                            <div className="flex gap-5 justify-between text-white whitespace-nowrap shadow-sm">
                                    <h3 style={{fontSize:"4vmin", fontWeight: "bold"}}>{list.name}</h3>
                                <div>
                                    <input style={{
                                            border: 'solid', borderRadius: 10, color:"black", width:'30%',
                                            paddingLeft: '0.5vw', paddingRight: '0.5vw',
                                        }}type="text" onChange={(e) => setListName(e.target.value)}/>
                                    <button style={{marginLeft:'0.5vw'}}
                                        className={"bg-blue-500 hover:bg-red-700 text-white py-1 px-1 rounded-full"}
                                        onClick={() => handleRenameList(list.id)}>
                                        Rename
                                    </button>
                                    <button
                                        className={"bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"}
                                        onClick={() => handleDeleteList(list.id)}>
                                        Delete
                                    </button>
                                </div>
                                <div className="rounded-full bg-zinc-300 h-[30px] w-[30px]"></div>
                            </div>
                            <div className="shrink-0 mt-2.5 bg-white rounded-3xl shadow-sm h-[210px]">
                                <ul>
                                    {cards[list.id] && cards[list.id].length >= 1 && cards[list.id].map((card, indexCards) => (
                                        <li style={{padding:"1%", fontSize:'2vmin'}} key={indexCards}>
                                            {card.name} <br/>
                                            <input style={{marginRight:"2vw", border: 'solid', borderRadius: 10, paddingLeft: '0.5vw', paddingRight: '0.5vw',}} type="text" onChange={(e) => setCardName(e.target.value)}/>
                                            <button style={{marginRight:'2%',fontSize:'2.5vmin'}}
                                                className={"bg-blue-500 hover:bg-red-700 text-white py-1 px-1 rounded-full"}
                                                onClick={() => handleRenameCard(card.id)}>
                                                Rename {card.name}
                                            </button>
                                            <button style={{marginRight:'2vw'}}
                                                className={"bg-red-500 hover:bg-red-700 text-white py-1 px-1 rounded-full"}
                                                onClick={() => handleDeleteCard(card.id)}>
                                                Delete
                                            </button>
                                            <select onChange={async (e) => {
                                                await handleAddMemberToCard(card.id, e.target.value);
                                            }}>
                                                <option value={null}>add member to this card</option>
                                                {members && members
                                                    .filter(member => !cardsMembers[card.id].some(cardsMember => cardsMember.id === member.id))
                                                    .map((member, indexMember) => (
                                                        <option key={indexMember} value={member.id}>
                                                            {member.fullName}
                                                        </option>
                                                    ))}
                                            </select>


                                            {cardsMembers[card.id] && cardsMembers[card.id].length >= 1 && (
                                                <div>
                                                    <p>Members:</p>
                                                    <ul>
                                                        {cardsMembers[card.id].map((member, indexAlreadyMember) => (
                                                            <li key={indexAlreadyMember}>{member.fullName}
                                                                <button style={{marginLeft:'1vw'}}
                                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                                                    onClick={() => handleRemoveMemberToCard(card.id, member.id)}>
                                                                    Delete
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            <select onChange={(e) => setListId(e.target.value)}>
                                                <option value={null}>Select a list</option>
                                                {lists && lists.length >= 1 && lists.map((list, indexList) => (
                                                    <option key={list.id} value={list.id}>{list.name}</option>
                                                ))}
                                            </select>
                                            <button onClick={() => handleMoveCard(card.id)}>Move it</button>
                                        </li>
                                    ))}
                                </ul>
                                <input placeholder="New card name" type="text"
                                       onChange={(e) => setCardName(e.target.value)}/>
                                <input placeholder="New card Description" type="text"
                                       onChange={(e) => setCardDesc(e.target.value)}/>
                            </div>
                            <span onClick={() => handleCreateCard(list.id, cardName, cardDesc)}
                                  className="flex gap-5 justify-between py-1.5 pr-1 pl-4 mt-2.5 text-black bg-white rounded-3xl shadow-sm">
                            <span className="flex-auto">New card</span>
                            <div className="rounded-full bg-zinc-300 h-[30px] w-[30px]"></div>
                        </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
