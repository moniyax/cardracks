export default (board) => dispatch => {
    const { title, id } = board
    dispatch({ type: 'WEBSOCKET_ADD_BOARD', payload: { title, id } })
    dispatch({ type: 'WEBSOCKET_ADD_BOARD_ID', payload: { id } })
}