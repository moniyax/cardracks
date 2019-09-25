import { combineReducers } from 'redux'
import { reducer as formReducer } from "redux-form";

const boardsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_BOARD':
            const newBoard = boardReducer(undefined, action)
            return { ...state, [newBoard.id]: newBoard }
        case 'ADD_RACK_ID':
            return { ...state, [action.payload.boardId]: boardReducer(state[action.payload.boardId], action) }
        case 'MOVE_RACK_ID':
            return { ...state, [action.payload.boardId]: boardReducer(state[action.payload.boardId], action) }
        default:
            return state
    }
}

const boardReducer = (state = { rackIds: [] }, { type, payload }) => {
    switch (type) {
        case 'ADD_BOARD':
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
        default:
            return state
    }
}

const boardIdsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_BOARD_ID':
            return [...state, action.payload.id]
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
            const srcRack = state[srcRackId]
            const cardId = state[srcRackId].cardIds[srcIndex]
            return {
                ...state,
                [srcRackId]: deleteCardFromRack(srcIndex, state[srcRackId]),
                [destRackId]: insertCard(cardId, destIndex, state[destRackId])
            }
        default:
            return state
    }
}

const deleteCardFromRack = (index, rack) => {
    const cardIds = rack.cardIds
    const deleted = [...cardIds.slice(0, index), ...cardIds.slice(index + 1)]
    return { ...rack, cardIds: deleted }
}

const insertCard = (cardId, index, rack) => {
    const cardIds = rack.cardIds
    const inserted = [...cardIds.slice(0, index), cardId, ...cardIds.slice(index)]
    return { ...rack, cardIds: inserted }

}

const rackReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_RACK':
            return { ...action.payload, id: action.payload.id, cardIds: [] }
        case 'ADD_CARD_ID':
            return { ...state, cardIds: [...state.cardIds, action.payload.cardId] }
        case 'MOVE_CARD_ID':
            const { fromIndex, toIndex } = action.payload
            const cardIds = state.cardIds
            const cardId = cardIds[fromIndex]
            const deleted = [...cardIds.slice(0, fromIndex), ...cardIds.slice(fromIndex + 1)]
            const inserted = [...deleted.slice(0, toIndex), cardId, ...deleted.slice(toIndex)]
            return { ...state, cardIds: inserted }
        default:
            return state
    }
}

const cardsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            const newCard = cardReducer(undefined, action)
            return {
                ...state,
                [newCard.id]: newCard
            }
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
    form: formReducer
})