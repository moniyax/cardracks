import {getBoards} from '../Api'
import receiveBoards from "../actions/ReceiveBoards"

export default () => (dispatch) => {
    return getBoards()
    .then(response => response.json())
    .then(boards => dispatch( receiveBoards(boards)))
    .catch(error => console.log(error));
}