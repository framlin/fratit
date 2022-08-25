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
1*	    1,2	    1*,2 #
1,2	    1*	    1*,2
1,2	    1*,2	1*,2
1*,2	1,2	    1*,2
1*,2*	1	    1*,2*
1	    1*,2*	1*,2*
1*,2	1,2*	1*,2*
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

async function test_pile_merging(pile_1_items, pile_2_items, expected_items) {
    let result = [];
    let {pile_1, pile_2} = await create_piles(pile_1_items, pile_2_items);
    let merged_pile =  pile_merger.merge(pile_1, pile_2);
    return merged_pile;
}
async function create_piles(pile_1_items, pile_2_items) {
    function clone_from(pile_postits, item) {
        let original_postit = pile_postits.find((postit) => postit.text === item);
        let cloned_postit = clone_postit(original_postit);
        return {original_postit, cloned_postit};
    }
    let pile_1_postits = [];
    let pile_1_item_list = pile_1_items.split(',');
    for (let item of pile_1_item_list) {
        if (item === '_') break;
        pile_1_postits.push(new Postit(item));
        await new Promise((r) => setTimeout(r, 2));
    }
    let pile_1 = new Pile(pile_1_postits);

    let pile_2_postits = [];
    let pil_2_item_list = pile_2_items.split(',');
    for (let item of pil_2_item_list) {
        if (item === '_') break;
        if (pile_1_item_list.includes(item)) {
            let {cloned_postit} = clone_from(pile_1_postits, item);
            pile_2_postits.push(cloned_postit);
        } else if (pile_1_item_list.includes(item+"*")) {
            let {original_postit, cloned_postit} = clone_from(pile_1_postits, item+"*");
            cloned_postit.text = item;
            await new Promise((r) => setTimeout(r, 2));
            original_postit.text = item+"*";
            pile_2_postits.push(cloned_postit);
        } else {
            if (item.includes('*')) {
                let {cloned_postit} = clone_from(pile_1_postits, item.split('*')[0]);
                cloned_postit.text = item;
                pile_2_postits.push(cloned_postit);
            } else {
                pile_2_postits.push(new Postit(item));

            }
        }
        await new Promise((r) => setTimeout(r, 2));
    }
    let pile_2 = new Pile(pile_2_postits);
    return {pile_1, pile_2}
}


describe('test_pile_merging-function', () => {
    describe('create_piles', () => {
        test('_	    _', async () => {
            let {pile_1, pile_2} = await create_piles("_", "_");
            expect(pile_1.all.length + pile_2.all.length).toBe(0);
        });

        test('1	    _', async () => {
            let {pile_1, pile_2} = await create_piles("1", "_");
            expect(pile_1.all.length + pile_2.all.length).toBe(1);
            expect(pile_1.all[0].text).toBe("1");
        });

        test('_	    1', async () => {
            let {pile_1, pile_2} = await create_piles("_", "1");
            expect(pile_1.all.length + pile_2.all.length).toBe(1);
            expect(pile_2.all[0].text).toBe("1");
        });

        test('1	    1', async () => {
            let {pile_1, pile_2} = await create_piles("1", "1");
            expect(pile_1.all.length + pile_2.all.length).toBe(2);
            expect(pile_1.all[0].is_same_as(pile_2.all[0])).toBe(true);
        });

        test('1	    2', async () => {
            let {pile_1, pile_2} = await create_piles("1", "2");
            expect(pile_1.all.length + pile_2.all.length).toBe(2);
            expect(pile_1.all[0].is_same_as(pile_2.all[0])).toBe(false);
        });

        test('2	    1', async () => {
            let {pile_1, pile_2} = await create_piles("2", "1");
            expect(pile_1.all.length + pile_2.all.length).toBe(2);
            expect(pile_1.all[0].is_same_as(pile_2.all[0])).toBe(false);
        });

        test('1	    1,2', async () => {
            let {pile_1, pile_2} = await create_piles("1", "1,2");
            expect(pile_1.all.length + pile_2.all.length).toBe(3);
            expect(pile_1.all[0].is_equal_with(pile_2.all[0])).toBe(true);
            expect(pile_1.all[0].is_equal_with(pile_2.all[1])).toBe(false);
        });

        test('1	    1*', async () => {
            let {pile_1, pile_2} = await create_piles("1", "1*");
            expect(pile_1.all.length + pile_2.all.length).toBe(2);
            expect(pile_1.all[0].is_same_as(pile_2.all[0])).toBe(true);
            expect(pile_1.all[0].is_equal_with(pile_2.all[0])).toBe(false);
        });

        test('1*	    1', async () => {
            let {pile_1, pile_2} = await create_piles("1*", "1");
            expect(pile_1.all.length + pile_2.all.length).toBe(2);
            expect(pile_1.all[0].is_same_as(pile_2.all[0])).toBe(true);
            expect(pile_1.all[0].is_equal_with(pile_2.all[0])).toBe(false);
        });

        test('1,2	    1,2', async () => {
            let {pile_1, pile_2} = await create_piles("1,2", "1,2");
            expect(pile_1.all.length + pile_2.all.length).toBe(4);
            expect(pile_1.all[0].is_equal_with(pile_2.all[0])).toBe(true);
            expect(pile_1.all[1].is_equal_with(pile_2.all[1])).toBe(true);
        });

        test('1,2*	    1,2', async () => {
            let {pile_1, pile_2} = await create_piles("1,2*", "1,2");
            expect(pile_1.all.length + pile_2.all.length).toBe(4);
            expect(pile_1.all[0].is_equal_with(pile_2.all[0])).toBe(true);
            expect(pile_1.all[1].is_same_as(pile_2.all[1])).toBe(true);
            expect(pile_1.all[1].is_equal_with(pile_2.all[1])).toBe(false);
            expect(pile_1.all[1].last_update).toBeGreaterThan(pile_2.all[1].last_update);
        });

        test('1,2	    1,2*', async () => {
            let {pile_1, pile_2} = await create_piles("1,2", "1,2*");
            expect(pile_1.all.length + pile_2.all.length).toBe(4);
            expect(pile_1.all[0].is_equal_with(pile_2.all[0])).toBe(true);
            expect(pile_1.all[1].is_same_as(pile_2.all[1])).toBe(true);
            expect(pile_1.all[1].is_equal_with(pile_2.all[1])).toBe(false);
            expect(pile_1.all[1].last_update).toBeLessThan(pile_2.all[1].last_update);
        });

        test('1,2	    1,2,3', async () => {
            let {pile_1, pile_2} = await create_piles("1,2", "1,2,3");
            expect(pile_1.all.length + pile_2.all.length).toBe(5);
            expect(pile_1.all[0].is_equal_with(pile_2.all[0])).toBe(true);
            expect(pile_1.all[1].is_equal_with(pile_2.all[1])).toBe(true);
            expect(pile_2.all[2].text).toBe("3");
        });

        test('1,2,3,4*,5,6*,8,9       1*,4,5,6,8,9*', async () => {
            let {pile_1, pile_2} = await create_piles("1,2,3,4*,5,6*,8,9", "1*,4,5,6,8,9*");
            expect(pile_1.all.length + pile_2.all.length).toBe(14);
            expect(pile_1.all[0].is_same_as(pile_2.all[0])).toBe(true);
            expect(pile_1.all[0].is_equal_with(pile_2.all[0])).toBe(false);
            expect(pile_1.all[3].is_same_as(pile_2.all[1])).toBe(true);
            expect(pile_1.all[3].is_equal_with(pile_2.all[1])).toBe(false);
            expect(pile_1.all[4].is_equal_with(pile_2.all[2])).toBe(true);
            expect(pile_1.all[5].is_same_as(pile_2.all[3])).toBe(true);
            expect(pile_1.all[5].is_equal_with(pile_2.all[3])).toBe(false);
            expect(pile_1.all[6].is_equal_with(pile_2.all[4])).toBe(true);
            expect(pile_1.all[7].is_same_as(pile_2.all[5])).toBe(true);
            expect(pile_1.all[7].is_equal_with(pile_2.all[5])).toBe(false);
        })
    });
});

beforeEach(() => {
    pile_merger = new PileMerger();
})
it('can be created', () => {
    let pile_merger = new PileMerger();
    expect(pile_merger).toBeInstanceOf(PileMerger);
});

test ('_	    _	    _', async () => {
    let merged_pile = await test_pile_merging('_', '_')
    expect(merged_pile.all).toStrictEqual([]);
});

test('1	    _	    1', async () => {
    let merged_pile = await test_pile_merging('1', '_')
    expect(merged_pile.all.length).toBe(1);
    expect(merged_pile.all[0].text).toBe('1');
});

test('_	    1	    1', async () => {
    let merged_pile = await test_pile_merging('_', '1')
    expect(merged_pile.all.length).toBe(1);
    expect(merged_pile.all[0].text).toBe('1');
});

test('1	    1	    1', async () => {
    let merged_pile = await test_pile_merging('1', '1')
    expect(merged_pile.all.length).toBe(1);
    expect(merged_pile.all[0].text).toBe('1');
})

test('1,2	    _	    1,2', async () => {
    let merged_pile = await test_pile_merging('1,2', '_')
    expect(merged_pile.all.length).toBe(2);
    expect(merged_pile.all[0].text).toBe('1');
    expect(merged_pile.all[1].text).toBe('2');
});

test('_	    1,2	    1,2', async () => {
    let merged_pile = await test_pile_merging('_', '1,2')
    expect(merged_pile.all.length).toBe(2);
    expect(merged_pile.all[0].text).toBe('1');
    expect(merged_pile.all[1].text).toBe('2');
});

test('1,2	    1	    1,2', async () => {
    let merged_pile = await test_pile_merging('1,2', '1')
    expect(merged_pile.all.length).toBe(2);
    expect(merged_pile.all[0].text).toBe('1');
    expect(merged_pile.all[1].text).toBe('2');
});

test('1	    1,2	    1,2', async () => {
    let merged_pile = await test_pile_merging('1', '1,2')
    expect(merged_pile.all.length).toBe(2);
    expect(merged_pile.all[0].text).toBe('1');
    expect(merged_pile.all[1].text).toBe('2');
});

test('1,2	    1,2	    1,2', async () => {
    let merged_pile = await test_pile_merging('1,2', '1,2')
    expect(merged_pile.all.length).toBe(2);
    expect(merged_pile.all[0].text).toBe('1');
    expect(merged_pile.all[1].text).toBe('2');
});

test('1,2    3    1,2,3', async () => {
    let merged_pile = await test_pile_merging('1,2', '3')
    expect(merged_pile.all.length).toBe(3);
    expect(merged_pile.all[0].text).toBe('1');
    expect(merged_pile.all[1].text).toBe('2');
    expect(merged_pile.all[2].text).toBe('3');
});

test('1    2,3    1,2,3', async () => {
    let merged_pile = await test_pile_merging('1', '2,3')
    expect(merged_pile.all.length).toBe(3);
    expect(merged_pile.all[0].text).toBe('1');
    expect(merged_pile.all[1].text).toBe('2');
    expect(merged_pile.all[2].text).toBe('3');
});

test('1,2    2,3    1,2,3', async () => {
    let merged_pile = await test_pile_merging('1,2', '2,3')
    expect(merged_pile.all.length).toBe(3);
    expect(merged_pile.all[0].text).toBe('1');
    expect(merged_pile.all[1].text).toBe('2');
    expect(merged_pile.all[2].text).toBe('3');
});

test('1*    1    1*', async () => {
    let merged_pile = await test_pile_merging('1*', '1')
    expect(merged_pile.all.length).toBe(1);
    expect(merged_pile.all[0].text).toBe('1*');
});

test('1    1*    1*', async () => {
    let merged_pile = await test_pile_merging('1', '1*')
    expect(merged_pile.all.length).toBe(1);
    expect(merged_pile.all[0].text).toBe('1*');
});

test('1*    1,2    1*,2', async () => {
    let merged_pile = await test_pile_merging('1*', '1,2')
    expect(merged_pile.all.length).toBe(2);
    expect(merged_pile.all[0].text).toBe('1*');
    expect(merged_pile.all[1].text).toBe('2');
});
