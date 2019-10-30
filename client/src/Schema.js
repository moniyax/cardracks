import { schema } from 'normalizr';

const board = new schema.Entity('boards')
const card = new schema.Entity('cards')
const rack = new schema.Entity('racks', {
    cards: [card]
})

export const boardsSchema =  [board]

export const racksSchema =  [rack]

