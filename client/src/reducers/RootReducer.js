import { combineReducers } from 'redux'
import { reducer as formReducer } from "redux-form";
import { mergeFetchedBoards } from "../Util";

const boardsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_BOARD':
        case 'WEBSOCKET_ADD_BOARD':
            const newBoard = boardReducer(undefined, action)
            return { ...state, [newBoard.id]: newBoard }
        case 'ADD_RACK_ID':
            return { ...state, [action.payload.boardId]: boardReducer(state[action.payload.boardId], action) }
        case 'MOVE_RACK_ID':
            return { ...state, [action.payload.boardId]: boardReducer(state[action.payload.boardId], action) }
        case 'RECEIVE_BOARDS':
            return mergeFetchedBoards(action.payload.entities.boards, state);
        case 'RECEIVE_RACKS':
            const boardId = action.payload.boardId
            const newBoard1 = boardReducer(state[boardId], action)

            return { ...state, [boardId]: newBoard1 }
        default:
            return state
    }
}

const boardReducer = (state = { rackIds: [] }, { type, payload }) => {
    switch (type) {
        case 'ADD_BOARD':
        case 'WEBSOCKET_ADD_BOARD':
            return { ...payload, rackIds: [], id: payload.id }
        case 'ADD_RACK_ID':
            return { ...state, rackIds: [...state.rackIds, payload.rackId] }
        case 'MOVE_RACK_ID':
            const { fromIndex, toIndex } = payload
            const rackIds = state.rackIds
            const rackId = rackIds[fromIndex]
            const deleted = [...rackIds.slice(0, fromIndex), ...rackIds.slice(fromIndex + 1)]
            const inserted = [...deleted.slice(0, toIndex), rackId, ...deleted.slice(toIndex)]
            return { ...state, rackIds: inserted }
        case 'RECEIVE_RACKS':
            return { ...state, rackIds: payload.rackIds }
        default:
            return state
    }
}

const boardIdsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_BOARD_ID':
            return [...state, action.payload.id]
        case 'WEBSOCKET_ADD_BOARD_ID':
            return state.indexOf(action.payload.id) > 0 ? state : [...state, action.payload.id]
        case 'RECEIVE_BOARDS':
            return action.payload.result;
        default:
            return state
    }
}

const racksReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_RACK':
            const newRack = rackReducer(undefined, action)
            return {
                ...state,
                [newRack.id]: newRack
            }
        case 'ADD_CARD_ID':
        case 'MOVE_CARD_ID':
            const currentRack = state[action.payload.rackId]
            return { ...state, [action.payload.rackId]: rackReducer(currentRack, action) }
        case 'MOVE_CARD_ID_TO_RACK':
            const { srcRackId, destRackId, srcIndex, destIndex } = action.payload
            const cardId = state[srcRackId].cards[srcIndex]
            return {
                ...state,
                [srcRackId]: deleteCardFromRack(srcIndex, state[srcRackId]),
                [destRackId]: insertCard(cardId, destIndex, state[destRackId])
            }
        case 'RECEIVE_RACKS':
            return { ...state, ...action.payload.racks }
        default:
            return state
    }
}

const rackReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_RACK':
            return { ...action.payload, id: action.payload.id, cards: [] }
        case 'ADD_CARD_ID':
            return { ...state, cards: [...state.cards, action.payload.cardId] }
        case 'MOVE_CARD_ID':
            const { fromIndex, toIndex } = action.payload
            const cards = state.cards
            const cardId = cards[fromIndex]
            const deleted = [...cards.slice(0, fromIndex), ...cards.slice(fromIndex + 1)]
            const inserted = [...deleted.slice(0, toIndex), cardId, ...deleted.slice(toIndex)]
            return { ...state, cards: inserted }
        default:
            return state
    }
}

const deleteCardFromRack = (index, rack) => {
    const cards = rack.cards
    const deleted = [...cards.slice(0, index), ...cards.slice(index + 1)]
    return { ...rack, cards: deleted }
}

const insertCard = (cardId, index, rack) => {
    const cards = rack.cards
    const inserted = [...cards.slice(0, index), cardId, ...cards.slice(index)]
    return { ...rack, cards: inserted }

}


const cardsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            const newCard = cardReducer(undefined, action)
            return {
                ...state,
                [newCard.id]: newCard
            }
        case 'RECEIVE_RACKS':
            return { ...state, ...action.payload.cards }
        default:
            return state
    }
}

const cardReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            return { ...action.payload, }
        default:
            return state
    }
}

const uiAddingBoardReducer = (state = false, action) => {
    switch (action.type) {
        case 'UI_ADDING_BOARD':
            return true;
        case 'UI_EXIT_ADDING_BOARD':
            return false;
        default:
            return state;
    }
}

const uiAddingRackReducer = (state = false, action) => {
    switch (action.type) {
        case 'UI_ADDING_RACK':
            return true;
        case 'UI_EXIT_ADDING_RACK':
            return false;
        default:
            return state;
    }
}

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SIGN_IN_SUCCESS':
        case 'SIGN_UP_SUCCESS':
            return { loggedIn: true, user: action.payload };
        case 'SIGN_OUT':
            return { loggedIn: false };
        case 'SIGN_IN_FAILURE':
            return { logInFailure: action.payload }
        default:
            return state;
    }
}

const uiReducer = combineReducers({
    isAddingBoard: uiAddingBoardReducer,
    isAddingRack: uiAddingRackReducer
})

export default combineReducers({
    boards: boardsReducer,
    boardIds: boardIdsReducer,
    racks: racksReducer,
    cards: cardsReducer,
    ui: uiReducer,
    auth: authReducer,
    form: formReducer.plugin({
        addBoard: (state, action) => { // addBoard -> form name given to reduxForm()
            switch (action.type) {
                case 'POST_BOARD_SUCCESS':
                    return undefined;       // <--- blow away form data
                default:
                    return state;
            }
        },
        addCard: (state, action) => { // addBoard -> form name given to reduxForm()
            switch (action.type) {
                case 'POST_CARD_SUCCESS':
                    return undefined;       // <--- blow away form data
                default:
                    return state;
            }
        },
        addRack: (state, action) => { // addBoard -> form name given to reduxForm()
            switch (action.type) {
                case 'POST_RACK_SUCCESS':
                    return undefined;       // <--- blow away form data
                default:
                    return state;
            }
        }
    })
})