import uuid from 'uuid/v4'
import addCardId from './AddCardId'
import { postCard } from "../Api";
import postCardSuccess from "./postCardSuccess";
import Store from "./../Store"

export default (title, rackId) => dispatch => {
    const id = uuid()

    const cardOrder = () => Store.getState().racks[rackId].cards

    dispatch({ type: 'ADD_CARD', payload: { title, id } })
    dispatch(addCardId(id, rackId))
    dispatch(postCard({id: id, title: title, card_order: cardOrder() }, rackId)
        .then(response => response.json())
        .then(card => postCardSuccess(card))
        .catch(error => console.log(error)))
}