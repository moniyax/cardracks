import { racksSchema } from "../Schema";
import { normalize } from "normalizr";

export default (fetchedRacks, boardId) => {
    const normRacks = normalize(fetchedRacks, racksSchema)
    const racks = normRacks.entities.racks
    const cards = normRacks.entities.cards
    const rackIds = normRacks.result

    return {
        type: 'RECEIVE_RACKS',
        payload: {
            racks: racks,
            rackIds: rackIds,
            boardId: boardId,
            cards: cards
        }
    }
}