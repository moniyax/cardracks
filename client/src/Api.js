export const getBoards = () => { return fetch('/api/boards') }
export const postBoard = (board) => { return fetch('/api/boards', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    body: JSON.stringify(board)}) }
export const getRacks = (boardId) => { return fetch(`/api/boards/${boardId}/card_racks`) }