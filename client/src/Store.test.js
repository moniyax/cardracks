import { createStore, applyMiddleware, } from 'redux'
import rootReducer from "./reducers/RootReducer"
import addBoard from './actions/AddBoard'
import addRack from './actions/AddRack'
import addCard from './actions/AddCard'
import moveItem from './actions/MoveItem'
import uiAddingBoard from './actions/UIAddingBoard'
import uiExitAddingBoard from './actions/uiExitAddingBoard'
import uiAddingRack from './actions/UIAddingRack'
import uiExitAddingRack from './actions/UIExitAddingRack'
import thunk from 'redux-thunk';

// ADD_BOARD

test('adding boards should populate boards dictionary', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    Store.dispatch(addBoard('some board'))
    const state = Store.getState()

    const ids = Object.keys(state.boards)

    expect(ids.length).toBe(1)
    expect(state.boards[ids[0]].title).toBe('some board')
})

test('new boards should be assigned unique uuids', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    Store.dispatch(addBoard('some board'))
    Store.dispatch(addBoard('other board'))

    const state = Store.getState()
    const ids = Object.keys(state.boards);

    expect(ids[0].length).toBe(36)
    expect(ids[1].length).toBe(36)
    expect(ids.length).toBe(2)
    expect(ids[0]).not.toBe(ids[1])
})

test('adding boards should populate board id list', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    Store.dispatch(addBoard('some board'))
    const state = Store.getState()

    expect(state.boardIds.length).toBe(1)
    expect(state.boardIds[0].length).toBe(36)
})

test('a new board should have an empty rack list', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    Store.dispatch(addBoard('some board'))
    const state = Store.getState()
    const ids = Object.keys(state.boards);

    expect(state.boardIds.length).toBe(1)
    expect(state.boards[ids[0]].rackIds.length).toBe(0)
})

//   ADD_RACK

test('adding racks should populate racks dictionary', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    Store.dispatch(addRack('some rack'))
    const state = Store.getState()

    const ids = Object.keys(state.racks)

    expect(ids.length).toBe(1)
    expect(state.racks[ids[0]].title).toBe('some rack')
})

test('new racks should be assigned unique uuids', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    Store.dispatch(addRack('some rack'))
    Store.dispatch(addRack('other rack'))
    const state = Store.getState()

    const ids = Object.keys(state.racks);


    expect(ids[0].length).toBe(36)
    expect(ids[1].length).toBe(36)
    expect(ids.length).toBe(2)
    expect(ids[0]).toBeDefined
    expect(ids[1]).toBeDefined
    expect(ids[0]).not.toBe(ids[1])
})


test('new racks should have empty card list', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    Store.dispatch(addRack('some rack'))
    const state = Store.getState()
    const ids = Object.keys(state.racks);

    expect(state.racks[ids[0]].cardIds.length).toBe(0)
})


test('adding a new rack should populate the boards rack ids list', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    Store.dispatch(addBoard('some board'))
    const state1 = Store.getState()
    const boardId = Object.keys(state1.boards)[0]

    Store.dispatch(addRack('some rack'))
    const state = Store.getState()
    const rackId = Object.keys(state.racks)[0];
    Store.dispatch({ type: 'ADD_RACK_ID', payload: { rackId, boardId } })
    const state2 = Store.getState()
    expect(state2.boards[Object.keys(state2.boards)[0]].rackIds).toEqual([rackId])
})

test('adding a new rack should populate the boards rack ids list', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    Store.dispatch(addBoard('some board'))
    expect(Store.getState().boardIds.length).toBe(1)
    const boardId = Store.getState().boardIds[0]

    Store.dispatch(addRack('some rack', boardId))
    const state = Store.getState()
    expect(Object.keys(state.racks).length).toBe(1)
    const rackId = Object.keys(state.racks)[0];
    const state2 = Store.getState()

    expect(state2.boards[Object.keys(state2.boards)[0]].rackIds).toEqual([rackId])
})

// // // CARDS

test('adding cards should populate cards dictionary', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))


    Store.dispatch(addRack('some rack'))
    const racks = Store.getState().racks;
    const rackId = Object.keys(racks)[0];

    Store.dispatch(addCard('some card', rackId))
    const state = Store.getState()

    const ids = Object.keys(state.cards)

    expect(ids.length).toBe(1)
    expect(state.cards[ids[0]].content).toBe('some card')
})

test('new cards should be assigned unique uuids', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))


    Store.dispatch(addBoard('some board'))
    const boardId = Store.getState().boardIds[0]

    Store.dispatch(addRack('some rack', boardId))
    const racks = Store.getState().racks;

    expect(Object.keys(racks).length).toBe(1)

    const rackId = Store.getState().boards[boardId].rackIds[0]

    Store.dispatch(addCard('some card', rackId))
    expect(Store.getState().racks[rackId].cardIds.length).toBe(1);


    Store.dispatch(addCard('other card', rackId))
    const cardIds = Store.getState().racks[rackId].cardIds;
    expect(cardIds.length).toBe(2);

    const state = Store.getState()

    const ids = Store.getState().racks[rackId].cardIds;

    expect(cardIds[0].length).toBe(36)
    expect(cardIds[1].length).toBe(36)
    expect(cardIds.length).toBe(2)
    expect(cardIds[0]).not.toBe(cardIds[1])
})

test('adding a new card should populate the racks card ids list', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    Store.dispatch(addRack('some rack'))
    const state1 = Store.getState()
    const rackIds = Object.keys(state1.racks);
    expect(rackIds.length).toBe(1)
    expect(state1.racks[rackIds[0]].cardIds).toEqual([])
    const rackId = rackIds[0]

    Store.dispatch(addCard('some card', rackId))
    const state = Store.getState()
    const cardsIds = Object.keys(state.cards);
    expect(cardsIds.length).toBe(1)
    const cardId = cardsIds[0];

    const state2 = Store.getState()
    expect(state2.racks[Object.keys(state2.racks)[0]].cardIds).toEqual([cardId])
})

test('adding a new rack should populate the boards rack ids list', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    Store.dispatch(addBoard('some board'))
    expect(Store.getState().boardIds.length).toBe(1)
    const boardId = Store.getState().boardIds[0]

    Store.dispatch(addRack('some rack', boardId))
    const state = Store.getState()
    expect(Object.keys(state.racks).length).toBe(1)
    const rackId = Object.keys(state.racks)[0];
    const state2 = Store.getState()

    expect(state2.boards[Object.keys(state2.boards)[0]].rackIds).toEqual([rackId])
})


// UI ADDING BOARD

test('uiAddingBoard is false by default', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))
    expect(Store.getState().ui.isAddingBoard).toBe(false);
})

test('uiAddingBoard', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))
    expect(Store.getState().ui.isAddingBoard).toBe(false);

    Store.dispatch(uiAddingBoard())

    const isAddingBoard = Store.getState().ui.isAddingBoard
    expect(isAddingBoard).toBe(true);
})

test('exit uiAddingBoard', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))
    expect(Store.getState().ui.isAddingBoard).toBe(false);

    Store.dispatch(uiAddingBoard())
    expect(Store.getState().ui.isAddingBoard).toBe(true);

    Store.dispatch(uiExitAddingBoard())
    expect(Store.getState().ui.isAddingBoard).toBe(false);


})

// UI ADDING RACK

test('uiAddingRack is false by default', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))

    expect(Store.getState().ui.isAddingRack).toBe(false);
})

test('uiAddingRack', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))
    expect(Store.getState().ui.isAddingRack).toBe(false);

    Store.dispatch(uiAddingRack())

    const isAddingRack = Store.getState().ui.isAddingRack
    expect(isAddingRack).toBe(true);
})

test('exit uiAddingRack', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))
    expect(Store.getState().ui.isAddingRack).toBe(false);

    Store.dispatch(uiAddingRack())
    expect(Store.getState().ui.isAddingRack).toBe(true);

    Store.dispatch(uiExitAddingRack())
    expect(Store.getState().ui.isAddingRack).toBe(false);
})

// move item

test('move rack', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))
    Store.dispatch(addBoard('some board'))
    expect(Store.getState().boardIds.length).toBe(1)
    const boardId = Store.getState().boardIds[0]
    Store.dispatch(addRack('some rack', boardId))
    Store.dispatch(addRack('some rack', boardId))

    const initRackIds = Store.getState().boards[boardId].rackIds
    expect(initRackIds.length).toBe(2)

    const type = 'rack'
    const src = { droppableId: boardId, index: 1 }
    const dest = { droppableId: boardId, index: 0 }

    Store.dispatch(moveItem(type, src, dest))
    const newRackIds = Store.getState().boards[boardId].rackIds
    expect(newRackIds.length).toBe(2)
    expect(newRackIds).not.toEqual(initRackIds)
    expect(newRackIds.sort()).toEqual(initRackIds.sort())
})

test('re-sort card', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))
    Store.dispatch(addBoard('some board'))
    const boardId = Store.getState().boardIds[0]
    Store.dispatch(addRack('some rack', boardId))

    const rackId = Store.getState().boards[boardId].rackIds[0]

    const rack = Store.getState().racks[rackId]
    const cardIds = rack.cardIds
    expect(cardIds.length).toBe(0)

    Store.dispatch(addCard('card content', rackId))
    Store.dispatch(addCard('another card content', rackId))
    expect(Store.getState().racks[rackId].cardIds.length).toBe(2)

    const src = { droppableId: rackId, index: 1 }
    const dest = { droppableId: rackId, index: 0 }

    const initCardIds = Store.getState().racks[rackId].cardIds
    Store.dispatch(moveItem('card', src, dest))

    const newCardIds = Store.getState().racks[rackId].cardIds

    expect(newCardIds.length).toBe(2)
    expect(newCardIds).not.toEqual(initCardIds)
    expect(newCardIds.sort()).toEqual(initCardIds.sort())
})

test('moving cards between racks', () => {
    const Store = createStore(rootReducer, applyMiddleware(thunk))
    Store.dispatch(addBoard('some board'))
    const boardId = Store.getState().boardIds[0]
    Store.dispatch(addRack('some rack', boardId))
    Store.dispatch(addRack('some other rack', boardId))

    const rackIds = Store.getState().boards[boardId].rackIds
    expect(rackIds.length).toBe(2)
    const [rackId1, rackId2] = rackIds

    expect(Store.getState().racks[rackId1].cardIds).toEqual([])
    expect(Store.getState().racks[rackId2].cardIds).toEqual([])

    Store.dispatch(addCard('card content', rackId1))
    Store.dispatch(addCard('another card content', rackId1))
    Store.dispatch(addCard('yet another card content', rackId2))

    expect(Store.getState().racks[rackId1].cardIds.length).toBe(2)
    expect(Store.getState().racks[rackId2].cardIds.length).toBe(1)

    Store.dispatch(moveItem('card',{ droppableId: rackId1, index: 0 },{ droppableId: rackId2, index: 0 }))

    expect(Store.getState().racks[rackId1].cardIds.length).toBe(1)
    expect(Store.getState().racks[rackId2].cardIds.length).toBe(2)
})

