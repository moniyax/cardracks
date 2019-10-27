import { mergeFetchedBoards } from "./Util";

test('merge fetched boards', () => {
    const currentState = {
            'id1': { title: 'foo', rackIds: [7, 2] },
            'id2': { title: 'bar', rackIds: [88] },
            'id3': { title: 'bazzz', rackIds: [5, 1] },
    }

    const fetched = {
            'id1': { title: 'foo' },
            'id8': { title: 'yikes' },
            'id2': { title: 'bar' },
    }

    const merged = mergeFetchedBoards(fetched, currentState)
    
    expect(merged).toEqual({
            'id1': { title: 'foo', rackIds: [7, 2] },
            'id8': { title: 'yikes', rackIds: [] },
            'id2': { title: 'bar', rackIds: [88] },
    })

})