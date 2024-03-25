let apiKey = 'b0c6cfddd8f3bcfb95bfdb84b0f0dad7';

let apiToken = sessionStorage.getItem('token');

/**
 * Retrieves all boards belonging to a specified organization.
 * @param organizationId ID of the organization to fetch boards from.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with an array of board objects
 */
const getAllBoards = (organizationId, token = apiToken ) => {
    return fetch(`https://api.trello.com/1/organizations/${organizationId}/boards?key=${apiKey}&token=${token}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch boards from organization');
            }
            return response.json();
        })
        .then(boards => {
            return boards;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
};

/**
 * Fetches all cards associated with a specified board.
 * @param {string} ID ID of the board to fetch cards from.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with an array of card objects.
 */
function getAllCards(ID, token = apiToken) {
    return fetch(`https://api.trello.com/1/boards/${ID}/cards?key=${apiKey}&token=${token}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch cards');
            }
            return response.json();
        })
        .then(cards => {
            return cards;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Retrieves all lists associated with a specified board.
 * @param {string} ID ID of the board to fetch lists from.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with an array of list objects.
 */
function getAllLists(ID, token = apiToken) {
    return fetch(`https://api.trello.com/1/boards/${ID}/lists?key=${apiKey}&token=${token}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch lists of cards');
            }
            return response.json();
        })
        .then(lists => {
            return lists;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Fetches all cards within a specified list.
 * @param {string} listId ID of the list to fetch cards from.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with an array of card objects.
 */
function getAllCardsFromList(listId, token = apiToken) {
    return fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${token}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch cards from list');
            }
            return response.json();
        })
        .then(cards => {
            return cards;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Retrieves details of a specific board by its ID.
 * @param {string} boardId ID of the board to fetch details for.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with the board object.
 */
function getBoardById(boardId, token = apiToken) {
    return fetch(`https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${token}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch board');
            }
            return response.json();
        })
        .then(board => {
            return board;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Creates a new card within a specified list.
 * @param {string} listId ID of the list to add the card to.
 * @param {string} cardName Name of the new card.
 * @param token Token used for testing (default is generated token by connection)
 * @param {string} cardDescription Description of the new card (optional).
 * @returns {Promise<any>} A promise that resolves with the created card object.
 */
function createCard(listId, cardName, cardDescription, token = apiToken) {
    const url = `https://api.trello.com/1/cards?key=${apiKey}&token=${token}`;
    const data = {
        name: cardName,
        desc: cardDescription,
        idList: listId
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create card');
            }
            return response.json();
        })
        .then(card => {
            return card;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Creates a new board.
 * @param {string} boardName Name of the new board.
 * @param {string} boardDescription Description of the new board (optional).
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with the created board object.
 */
function createBoard(boardName, boardDescription, token = apiToken) {
    const url = `https://api.trello.com/1/boards/?key=${apiKey}&token=${token}`;
    const data = {
        name: boardName,
        desc: boardDescription
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create board');
            }
            return response.json();
        })
        .then(board => {
            return board;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Deletes a board by its ID.
 * @param {string} boardId ID of the board to delete.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<void>} A promise that resolves when the board is successfully deleted.
 */
function deleteBoard(boardId, token = apiToken) {
    const url = `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${token}`;

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete board');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Creates a new list within a specified board.
 * @param {string} boardId ID of the board to add the list to.
 * @param {string} listName Name of the new list.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with the created list object.
 */
function createList(boardId, listName, token = apiToken) {
    const url = `https://api.trello.com/1/lists?key=${apiKey}&token=${token}&name=${encodeURIComponent(listName)}&idBoard=${boardId}`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create list');
            }
            return response.json();
        })
        .then(list => {
            return list;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Archives a list by its ID.
 * @param {string} listId ID of the list to archive.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves when the list is successfully archived.
 */
function archiveList(listId, token = apiToken) {
    const url = `https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${token}`;

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: true })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to archive list. Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error archiving list:', error.message);
            throw error;
        });
}

/**
 * Deletes a card by its ID.
 * @param {string} cardId ID of the card to delete.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves when the card is successfully deleted.
 */
function deleteCard(cardId, token = apiToken) {
    const url = `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`;

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to delete card. Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error deleting card:', error.message);
            throw error;
        });
}

/**
 * Fetches information about the user.
 * @param {string} token User's access token.
 * @returns {Promise<any>} A promise that resolves with user information.
 */
async function getUserInfos(token) {
    const response = await fetch(`https://api.trello.com/1/members/me?key=${apiKey}&token=${token}`);

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Failed to fetch user data');
    }
}

/**
 * Fetches organizations associated with a user.
 * @param {string} userId ID of the user.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with an array of organization objects.
 */
function getUserOrganizations(userId, token = apiToken) {
    const url = `https://api.trello.com/1/members/${userId}/organizations?key=${apiKey}&token=${token}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch user organizations. Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching user organizations:', error.message);
            throw error;
        });
}

/**
 * Fetches the maximum number of boards allowed in an organization.
 * @param {string} organizationId ID of the organization.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with the maximum number of boards allowed.
 */
function fetchMaxBoardsInOrganization(organizationId, token = apiToken) {
    const url = `https://api.trello.com/1/organizations/${organizationId}?key=${apiKey}&token=${token}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch organization details. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let response
            switch (data.offering) {
                case "trello.free" : response = 10; break;
                default: response = "unlimited"
            }
            return(response)
        })
        .catch(error => {
            console.error('Error fetching organization details:', error.message);
            throw error;
        });
}

/**
 * Creates a new organization.
 * @param {string} name Name of the new organization.
 * @param {string} description Description of the new organization (optional).
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with the created organization object.
 */
function createOrganization(name, description="", token = apiToken) {
    const url = `https://api.trello.com/1/organizations?key=${apiKey}&token=${token}`;

    const data = {
        displayName: name,
        desc: description
    };

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to create organization. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(createdOrg => {
            return createdOrg;
        })
        .catch(error => {
            console.error('Error creating organization:', error.message);
            throw error;
        });
}

/**
 * Deletes an organization by its ID.
 * @param {string} organizationId ID of the organization to delete.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves when the organization is successfully deleted.
 */
async function deleteOrganization(organizationId, token = apiToken) {
    const url = `https://api.trello.com/1/organizations/${organizationId}?key=${apiKey}&token=${token}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete organization. Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error deleting organization:', error.message);
        throw error;
    }
}

/**
 * Renames a workspace (organization) by its ID.
 * @param {string} workspaceId ID of the workspace to rename.
 * @param {string} newName New name for the workspace.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with the updated workspace object.
 */
function renameWorkspace(workspaceId, newName, token = apiToken) {
    const url = `https://api.trello.com/1/organizations/${workspaceId}?key=${apiKey}&token=${token}`;

    const data = {
        displayName: newName
    };

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to rename workspace. Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error renaming workspace:', error.message);
            throw error;
        });
}

/**
 * Renames a board with a new name.
 * @param {string} boardId ID of the board to rename.
 * @param {string} newName New name for the board.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves when the board is successfully renamed.
 */
function renameBoardById(boardId, newName, token = apiToken) {
    const url = `https://api.trello.com/1/boards/${boardId}?key=${apiKey}&token=${token}`;
    const data = {
        name: newName
    };

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to rename board');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Renames a card with a new name.
 * @param {string} cardId ID of the card to rename.
 * @param {string} newName New name for the card.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves when the card is successfully renamed.
 */
function renameCardById(cardId, newName, token = apiToken) {
    const url = `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`;
    const data = {
        name: newName
    };

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to rename card');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}


/**
 * Renames a board with a new name.
 * @param {string} listId ID of the board to rename.
 * @param {string} newName New name for the board.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves when the board is successfully renamed.
 */
function renameListById(listId, newName, token = apiToken) {
    const url = `https://api.trello.com/1/lists/${listId}?key=${apiKey}&token=${token}`;
    const data = {
        name: newName
    };

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to rename board');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Retrieves all members of an organization by its ID.
 * @param {string} organizationId ID of the organization to fetch members for.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with an array of members.
 */
function getOrganizationMembers(organizationId, token = apiToken) {
    const url = `https://api.trello.com/1/organizations/${organizationId}/members?key=${apiKey}&token=${token}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch organization members');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Retrieves assigned members of a card by its ID.
 * @param {string} cardId ID of the card to fetch assigned members for.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with an array of assigned members.
 */
function getCardMembers(cardId, token = apiToken) {
    const url = `https://api.trello.com/1/cards/${cardId}/members?key=${apiKey}&token=${token}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch card members');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

/**
 * Retrieves user information by their ID.
 * @param {string} userId ID of the user to fetch information for.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves with the user object.
 */
async function getUserInfoById(userId, token = apiToken) {
    const url = `https://api.trello.com/1/members/${userId}?key=${apiKey}&token=${token}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch user information');
        }
        const userInfo = await response.json();
        return userInfo;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

/**
 * Adds a member to a card.
 * @param {string} cardId ID of the card to add the member to.
 * @param {string} memberId ID of the member to add to the card.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves when the member is successfully added to the card.
 */
async function addMemberToCard(cardId, memberId, token = apiToken) {
    const url = `https://api.trello.com/1/cards/${cardId}/idMembers?key=${apiKey}&token=${token}`;
    const data = {
        value: memberId
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to add member to card');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

/**
 * Removes a member from a card.
 * @param {string} cardId ID of the card to remove the member from.
 * @param {string} memberId ID of the member to remove from the card.
 * @param token Token used for testing (default is generated token by connection)
 * @returns {Promise<any>} A promise that resolves when the member is successfully removed from the card.
 */
async function removeMemberFromCard(cardId, memberId, token = apiToken) {
    const url = `https://api.trello.com/1/cards/${cardId}/idMembers/${memberId}?key=${apiKey}&token=${token}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to remove member from card');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}


const getTemplates = (organizationId="55ae3bbdc90077a7a08934a2", token = apiToken ) => {
    return fetch(`https://api.trello.com/1/organizations/${organizationId}/boards?key=${apiKey}&token=${token}&filter=templates`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch template boards from organization');
            }
            return response.json();
        })
        .then(templateBoards => {
            return templateBoards;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
};


function createBoardFromExisting(boardId, boardName, token = apiToken) {
    const url = `https://api.trello.com/1/boards/?key=${apiKey}&token=${token}&idBoardSource=${boardId}&name=${encodeURIComponent(boardName)}`;

    fetch(url, {
        method: 'POST'
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error creating board:', error);
        });
}


/**
 * Creates a new board from an Organization.
 * @param {string} organizationId Name of the organization.
 * @param {string} boardName Name of the new board.
 * @param {string} boardDescription Description of the new board (optional).
 * @returns {Promise<any>} A promise that resolves with the created board object.
 */
async function createBoardInOrganization(organizationId, boardName, boardDesc) {
    const url = `https://api.trello.com/1/boards/?name=${encodeURIComponent(boardName)}&desc=${encodeURIComponent(boardDesc)}&idOrganization=${organizationId}&key=${apiKey}&token=${apiToken}`;

    try {
        const response = await fetch(url, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Failed to create board in organization');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

/**
 * Creates a new board from an Organization.
 * @param {string} organizationId Name of the organization.
 * @param {string} boardName Name of the new board.
 * @param {string} boardDescription Description of the new board (optional).
 * @returns {Promise<any>} A promise that resolves with the created board object.
 */
async function createBoardFromExistingInOrganization(organizationId, boardId, boardName) {
    const url = `https://api.trello.com/1/boards/?name=${encodeURIComponent(boardName)}&idOrganization=${organizationId}&idBoardSource=${boardId}&key=${apiKey}&token=${apiToken}`;

    try {
        const response = await fetch(url, {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error('Failed to create board in organization');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
const moveCardToList = (cardId, listId, token = apiToken) => {
    const url = `https://api.trello.com/1/cards/${cardId}?idList=${listId}&key=${apiKey}&token=${token}`;
    const options = {
        method: 'PUT',
    };

    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to move card to another list');
            }
            return response.json();
        })
        .then(movedCard => {
            return movedCard;
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
};



export default {
    getAllBoards,
    getAllCards,
    getAllLists,
    getAllCardsFromList,
    getBoardById,
    createCard,
    createBoard,
    deleteBoard,
    createList,
    archiveList,
    deleteCard,
    getUserInfos,
    getUserOrganizations,
    fetchMaxBoardsInOrganization,
    createOrganization,
    deleteOrganization,
    renameWorkspace,
    renameBoardById,
    renameCardById,
    renameListById,
    getOrganizationMembers,
    getCardMembers,
    getUserInfoById,
    addMemberToCard,
    removeMemberFromCard,
    getTemplates,
    createBoardFromExisting,
    createBoardInOrganization,
    createBoardFromExistingInOrganization,
    moveCardToList
};
