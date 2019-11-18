const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token token="' + JSON.parse(localStorage.getItem('user')).token + '"'
}

export const getBoards = () => {
    return fetch('/api/boards', {
        headers
    })
}

export const postBoard = (board) => {
    return fetch('/api/boards', {
        method: 'POST',
        headers,
        body: JSON.stringify(board)
    })
}

export const postRack = (rack, boardId) => {
    return fetch(`/api/boards/${boardId}/card_racks`, {
        method: 'POST',
        headers,
        body: JSON.stringify(rack)
    })
}

export const postCard = (card, rackId) => {
    return fetch(`/api/card_racks/${rackId}/cards`, {
        method: 'POST',
        headers,
        body: JSON.stringify(card)
    })
}

export const updateCard = (cardId, card_attr) => {
    console.log('card_attr', card_attr)

    return fetch(`/api/cards/${cardId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(card_attr)
    })
}

export const reorderCard = (cardId, card_attr) => {
    console.log('card_attr', card_attr)

    return fetch(`/api/cards/${cardId}/reorder`, {
        method: 'POST',
        headers,
        body: JSON.stringify(card_attr)
    })
}

export const updateBoard = (boardId, board_attr) => {

    return fetch(`/api/boards/${boardId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(board_attr)
    })
}

export const getRacks = (boardId) => { return fetch(`/api/boards/${boardId}/card_racks`, {
    headers: headers
}) }