import apiMoveCardToRack from "./ApiMoveCardToRack";
import apiMoveRack from "./ApiMoveRack";
import Store from "./../Store";

export default (type, src, dest) => {
    if (src.droppableId === dest.droppableId) {
        switch (type) {
            case 'rack':
                const move_rack_id = {
                    type: 'MOVE_RACK_ID',
                    payload: {
                        boardId: dest.droppableId,
                        fromIndex: src.index,
                        toIndex: dest.index
                    }
                }

                const boardId = src.droppableId 
                const rack_order = () => Store.getState().boards[boardId].rackIds
                
                return (dispatch) => {
                    new Promise((res, rej) => {
                        dispatch(move_rack_id)
                        res(undefined)
                    }).then(() => apiMoveRack(boardId, rack_order()))
                }
            case 'card':
                return {
                    type: 'MOVE_CARD_ID',
                    payload: {
                        rackId: dest.droppableId,
                        fromIndex: src.index,
                        toIndex: dest.index
                    }
                }
            default:
                break;
        }
    } else {
        switch (type) {

            case 'card':
                const cardId = Store.getState().racks[src.droppableId].cards[src.index]
                const destRackId = dest.droppableId

                const move_card_id_to_rack = {
                    type: 'MOVE_CARD_ID_TO_RACK',
                    payload: {
                        srcRackId: src.droppableId,
                        destRackId: dest.droppableId,
                        srcIndex: src.index,
                        destIndex: dest.index,
                    }

                }

                return (dispatch) => {
                    new Promise((res, rej) => {
                        dispatch(move_card_id_to_rack)
                        res(undefined)
                    }).then(() => apiMoveCardToRack(cardId, destRackId))
                }
            default:
                break;
        }
    }
}
