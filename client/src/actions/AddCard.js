import uuid from 'uuid/v1'
import addCardId from './AddCardId'

export default (content, rackId) => dispatch => {
    const id = uuid()

    dispatch({ type: 'ADD_CARD', payload: { content, id } })
    dispatch(addCardId( id, rackId))
}