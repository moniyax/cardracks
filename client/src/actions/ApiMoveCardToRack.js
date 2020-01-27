import { updateCard } from "../Api";

export default (cardId, rackId, cardOrder) => {
    updateCard(cardId, {card_rack_id: rackId, card_order: cardOrder})
}