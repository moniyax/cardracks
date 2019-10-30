import uuid from 'uuid/v4'
import addCardId from './AddCardId'

export default (title, rackId) => dispatch => {
    const id = uuid()

    dispatch({ type: 'ADD_CARD', payload: { title, id } })
    dispatch(addCardId( id, rackId))
}