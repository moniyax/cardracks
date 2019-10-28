import {  schema } from 'normalizr';

const board = new schema.Entity('boards')
export const boardsSchema =  [board]

const rack = new schema.Entity('racks')
export const racksSchema =  [rack]

