import uuid from 'uuid/v1'
import addRackId from './AddRackId'

export default (title, boardId) => dispatch => {
    const id = uuid()

    dispatch({ type: 'ADD_RACK', payload: { title, id } })
    dispatch(addRackId( id, boardId))

}