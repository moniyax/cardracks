import uuid from 'uuid/v4'
import { postRack } from "../Api"
import Store from "./../Store"

import addRackId from './AddRackId'
import postRackSuccess from "./PostRackSuccess";

export default (title, boardId) => dispatch => {
    const id = uuid()

    const rackOrder = () => Store.getState().boards[boardId].rackIds

    dispatch({ type: 'ADD_RACK', payload: { title, id } })
    dispatch(addRackId(id, boardId))
    dispatch(postRack({id: id, title: title, rack_order: rackOrder() }, boardId)
        .then(response => response.json())
        .then(rack => postRackSuccess(rack))
        .catch(error => console.log(error)))
}
