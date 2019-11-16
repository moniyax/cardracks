import { updateCard } from "../Api";

export default (cardId, rackId, cardOrder) => {
    console.log('---cardOrder', cardOrder)
    updateCard(cardId, {card_rack_id: rackId, card_order: cardOrder})
}