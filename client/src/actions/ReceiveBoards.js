import boardsSchema from "../Schema";
import { normalize } from "normalizr";

export default (boards) => {
    console.log('boards',boards);
    const normBoards = normalize(boards, boardsSchema)

    console.log('normBoards',normBoards);
    
    return {type: 'RECEIVE_BOARDS', payload: normBoards}
}