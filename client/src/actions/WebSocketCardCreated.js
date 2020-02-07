export default (card, rackId) => dispatch => {
    const { title, id } = card
    const cardId = id
    dispatch({ type: 'WEBSOCKET_ADD_CARD', payload: { title, id } })
    dispatch({ type: 'WEBSOCKET_ADD_CARD_ID', payload: {  cardId, rackId } })
}

