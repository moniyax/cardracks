export default (rack, boardId) => dispatch => {
    const { title, id } = rack
    const rackId = id
    dispatch({ type: 'WEBSOCKET_ADD_RACK', payload: { title, rackId } })
    dispatch({ type: 'WEBSOCKET_ADD_RACK_ID', payload: {  rackId, boardId  } })
}

