import { reorderCard } from "../Api";

export default (cardId, cardOrder) => {
    reorderCard(cardId, {card_order: cardOrder})
}
