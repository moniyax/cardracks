import boardsSchema from "../Schema";
import { normalize } from "normalizr";

export default (boards) => {
    const normBoards = normalize(boards, boardsSchema)
    return {type: 'RECEIVE_BOARDS', payload: normBoards}
}