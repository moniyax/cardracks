import { updateBoard } from "../Api";

export default (boardId, rack_order) => {
   return updateBoard(boardId, {board: {rack_order}})
}