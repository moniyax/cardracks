import {getRacks} from '../Api'
import receiveRacks from "../actions/ReceiveRacks"

export default (boardId) => (dispatch) => {
    return getRacks(boardId)
    .then(response => response.json())
    .then(racks => dispatch( receiveRacks(racks, boardId)))
    .catch(error => console.log(error));
}