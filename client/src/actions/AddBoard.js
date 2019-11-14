import uuid from 'uuid/v4'
import { postBoard } from "../Api";
import postBoardSuccess from "./PostBoardSuccess";
export default (title) => dispatch => {
    const id = uuid()
    dispatch({ type: 'ADD_BOARD', payload: { title, id } })
    dispatch({ type: 'ADD_BOARD_ID', payload: { id } })
    dispatch(postBoard({board:{id:id, title: title}})
        .then(response => response.json())
        .then(board => postBoardSuccess())
        .catch(error => console.log(error)))
}
