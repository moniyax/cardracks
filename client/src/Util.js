export const mergeFetchedBoards = (fetched, current) => {
    const keys = Object.keys(fetched);
    const res = keys.reduce((acc, key) => {
        const foo = current[key] ? { ...fetched[key], rackIds: current[key].rackIds } : { ...fetched[key], rackIds: [] }
        acc[key] = foo
        return acc
    }, {})
    console.log('res', res);
    console.log('keys', keys);

    return res;
}


