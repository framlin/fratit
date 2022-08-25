/**
_	    _	    _
1	    _	    1
_	    1	    1
1	    1	    1
1,2	    _	    1,2
_	    1,2	    1,2
1,2	    1	    1,2
1	    1,2	    1,2
1,2	    1,2	    1,2
1,2	    3	    1,2,3
1	    2,3	    1,2,3
1,2	    2,3	    1,2,3
1*	    1	    1*
1	    1*	    1*
1*,2	1,2	    1*,2
1,2	    1*,2	1*,2
1*,2*	1,2	    1*,2*
1,2	    1*,2*	1*,2*
1,2*	2,3	    1,2*,3
1,2	    2*,3	1,2*,3
**/

const PileMerger = require("../../postit/PileMerger");
const Postit = require("../../postit/Postit");
const Pile = require("../../postit/Pile");
let pile_merger;

function clone_postit(postit) {
    let json = JSON.stringify(postit);
    return Postit.from_JSON(json);
}

async function create_two_different_postits() {
    let postit_1 = new Postit('1');
    await new Promise((r) => setTimeout(r, 2));
    let postit_2 = new Postit('2');
    return {postit_1, postit_2}
}


function merge_piles(items_1, items_2) {
    let pile_1 = new Pile(items_1);
    let pile_2 = new Pile(items_2);
    return pile_merger.merge(pile_1, pile_2);
}
beforeEach(() => {
    pile_merger = new PileMerger();
})
it('can be created', () => {
    let pile_merger = new PileMerger();
    expect(pile_merger).toBeInstanceOf(PileMerger);
});

test ('_	    _	    _', () => {
    let merged_pile = merge_piles([], [])
    expect(merged_pile.all).toStrictEqual([]);
});

test('1	    _	    1', () => {
    let postit = new Postit();
    let merged_pile = merge_piles([postit], [])
    expect(merged_pile.all.length).toBe(1);
    expect(merged_pile.all[0] === postit).toBe(true);
});

test('_	    1	    1', () => {
    let postit = new Postit();
    let merged_pile = merge_piles([], [postit])
    expect(merged_pile.all.length).toBe(1);
    expect(merged_pile.all[0] === postit).toBe(true);
});

test('1	    1	    1', () => {
    let postit_1 = new Postit('text');
    let postit_2 = clone_postit(postit_1);
    let merged_pile = merge_piles([postit_1], [postit_2])
    expect(merged_pile.all.length).toBe(1);
    expect(merged_pile.all[0] === postit_1).toBe(true);
})

test('1,2	    _	    1,2', async () => {
    const {postit_1, postit_2} = await create_two_different_postits();
    let merged_pile = merge_piles([postit_1, postit_2], [])
    expect(merged_pile.all.length).toBe(2);
    expect(merged_pile.all[0] === postit_1).toBe(true);
});

test('_	    1,2	    1,2', async () => {
    const {postit_1, postit_2} = await create_two_different_postits();
    let merged_pile = merge_piles([], [postit_1, postit_2])
    expect(merged_pile.all.length).toBe(2);
    expect(merged_pile.all[0] === postit_1).toBe(true);
});

test('1,2	    1	    1,2', async () => {
    const {postit_1, postit_2} = await create_two_different_postits();
    let merged_pile = merge_piles([postit_1, postit_2], [postit_1])
    expect(merged_pile.all.length).toBe(2);
    expect(merged_pile.all[0] === postit_1).toBe(true);
});

test('1	    1,2	    1,2', async () => {
    const {postit_1, postit_2} = await create_two_different_postits();
    let merged_pile = merge_piles([postit_1], [postit_1, postit_2])
    expect(merged_pile.all.length).toBe(2);
    expect(merged_pile.all[0] === postit_1).toBe(true);
});

test('1,2	    1,2	    1,2', async () => {
    const {postit_1, postit_2} = await create_two_different_postits();
    let merged_pile = merge_piles([postit_1, postit_2], [postit_1, postit_2])
    expect(merged_pile.all.length).toBe(2);
    expect(merged_pile.all[0] === postit_1).toBe(true);
});
