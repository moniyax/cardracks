export const mergeFetchedBoards = (fetched, current) => {
    const boards = fetched ? fetched : {}
    const keys = Object.keys(boards);
    const res = keys.reduce((acc, key) => {
        const foo = current[key] ? { ...fetched[key], rackIds: current[key].rackIds } : { ...fetched[key], rackIds: [] }
        acc[key] = foo
        return acc
    }, {})
    return res;
}


