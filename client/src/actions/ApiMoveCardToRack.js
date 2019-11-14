import { updateCard } from "../Api";

export default (cardId, rackId) => {
    updateCard(cardId, {card_rack_id: rackId})
}