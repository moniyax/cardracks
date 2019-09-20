import uuid from 'uuid/v1'

export default (title) => dispatch => {
    const id = uuid()
    dispatch({ type: 'ADD_BOARD', payload: { title, id } })
    dispatch({ type: 'ADD_BOARD_ID', payload: { id } })
}
