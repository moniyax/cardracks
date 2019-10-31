import uuid from 'uuid/v4'
import addCardId from './AddCardId'
import { postCard } from "../Api";
import postCardSuccess from "./PostRackSuccess";

export default (title, rackId) => dispatch => {
    const id = uuid()

    dispatch({ type: 'ADD_CARD', payload: { title, id } })
    dispatch(addCardId(id, rackId))
    dispatch(postCard({ title: title }, rackId)
        .then(response => response.json())
        .then(card => postCardSuccess(card))
        .catch(error => console.log(error)))
}