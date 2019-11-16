export const getBoards = () => { return fetch('/api/boards') }

export const postBoard = (board) => {
    return fetch('/api/boards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(board)
    })
}

export const postRack = (rack, boardId) => {
    return fetch(`/api/boards/${boardId}/card_racks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(rack)
    })
}

export const postCard = (card, rackId) => {
    return fetch(`/api/card_racks/${rackId}/cards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(card)
    })
}

export const updateCard = (cardId, card_attr) => {
    console.log('card_attr', card_attr)
    
    return fetch(`/api/cards/${cardId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(card_attr)
    })
}

export const reorderCard = (cardId, card_attr) => {
    console.log('card_attr', card_attr)
    
    return fetch(`/api/cards/${cardId}/reorder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(card_attr)
    })
}


export const updateBoard = (boardId, board_attr) => {

    return fetch(`/api/boards/${boardId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(board_attr)
    })
}




export const getRacks = (boardId) => { return fetch(`/api/boards/${boardId}/card_racks`) }