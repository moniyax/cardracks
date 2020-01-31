import Store from "./Store";

const headers = () => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token token="' + Store.getState().auth.user.token + '"'
})

export const getBoards = () => {
    return fetch('/api/boards', {
        headers: headers()
    })
}

export const postBoard = (board) => {
    return fetch('/api/boards', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(board)
    })
}

export const postRack = (rack, boardId) => {
    return fetch(`/api/boards/${boardId}/card_racks`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(rack)
    })
}

export const postCard = (card, rackId) => {
    return fetch(`/api/card_racks/${rackId}/cards`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(card)
    })
}

export const updateCard = (cardId, card_attr) => {
    return fetch(`/api/cards/${cardId}`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(card_attr)
    })
}

export const reorderCard = (cardId, card_attr) => {
    return fetch(`/api/cards/${cardId}/reorder`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(card_attr)
    })
}

export const updateBoard = (boardId, board_attr) => {

    return fetch(`/api/boards/${boardId}`, {
        method: 'PATCH',
        headers: headers(),
        body: JSON.stringify(board_attr)
    })
}

export const getRacks = (boardId) => {
    return fetch(`/api/boards/${boardId}/card_racks`, {
        headers: headers(),
    })
}


export const signIn = (email, password) => {
    return fetch('api/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            'email': email,
            'password': password,
        })
    })
}

export const signUp = (name, email, password) => {
    return fetch('api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          'name': name,
          'email': email,
          'password': password,
        })
      })
}