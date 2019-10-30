export const getBoards = () => { return fetch('/api/boards') }
export const getRacks = (boardId) => { return fetch(`/api/boards/${boardId}/card_racks`) }