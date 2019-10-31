import uuid from 'uuid/v4'
import { postRack } from "../Api";

import addRackId from './AddRackId'
import postRackSuccess from "./PostRackSuccess";

export default (title, boardId) => dispatch => {
    const id = uuid()

    dispatch({ type: 'ADD_RACK', payload: { title, id } })
    dispatch(addRackId(id, boardId))
    dispatch(postRack({ title: title }, boardId)
        .then(response => response.json())
        .then(board => postRackSuccess())
        .catch(error => console.log(error)))
}