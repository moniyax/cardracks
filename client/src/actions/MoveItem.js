import apiMoveCardToRack from "./ApiMoveCardToRack";
import Store from "./../Store";

export default (type, src, dest) => {
    if (src.droppableId === dest.droppableId) {
        switch (type) {
            case 'rack':
                return {
                    type: 'MOVE_RACK_ID',
                    payload: {
                        boardId: dest.droppableId,
                        fromIndex: src.index,
                        toIndex: dest.index
                    }
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
                const card = Store.getState().cards[cardId]
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
                    }).then(() => apiMoveCardToRack(card, destRackId))
                }
            default:
                break;
        }
    }
}
