import uuid from 'uuid/v4'
import addCardId from './AddCardId'

export default (content, rackId) => dispatch => {
    const id = uuid()

    dispatch({ type: 'ADD_CARD', payload: { content, id } })
    dispatch(addCardId( id, rackId))
}