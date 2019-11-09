import { updateRack } from "../Api";

export default (card, rackId) => {
    const newCard = {...card, card_rack_id: rackId}
    updateRack(newCard)
}