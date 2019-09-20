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
        console.log('src.droppableId',src.droppableId);
        console.log('dest.droppableId',dest.droppableId);
        
        switch (type) {
            
            case 'card':
                return {
                    type: 'MOVE_CARD_ID_TO_RACK',
                    payload: {
                        srcRackId: src.droppableId,
                        destRackId: dest.droppableId,
                        srcIndex: src.index,
                        destIndex: dest.index,

                    }
                }
            default:
                break;
        }
    }
}
