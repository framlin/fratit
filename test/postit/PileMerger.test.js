/**
 _        _        _
 1        _        1
 _        1        1
 1        1        1
 1,2        _        1,2
 _        1,2        1,2
 1,2        1        1,2
 1        1,2        1,2
 1,2        1,2        1,2
 1,2        3        1,2,3
 1        2,3        1,2,3
 1,2        2,3        1,2,3
 1*        1        1*
 1        1*        1*
 1*        1,2        1*,2
 1,2        1*        1*,2
 1,2        1*,2    1*,2
 1*,2    1,2        1*,2
 1*,2    1        1*,2
 1        1*,2    1*,2
 1*,2    1,2*    1*,2*
 1*,2*    1,2        1*,2*
 1,2        1*,2*    1*,2*
 1,2*    2,3        1,2*,3
 1,2        2*,3    1,2*,3
 **/

const PileMerger = require("../../postit/PileMerger");
const Postit = require("../../postit/Postit");
const Pile = require("../../postit/Pile");
let pile_merger;


function expect_to_be_the_same_but_different(postit_1, postit_2) {
    let same = postit_1.is_same_as(postit_2);
    let different = !(postit_1.is_equal_with(postit_2));
    expect(same && different).toBe(true);
}

function expect_to_be_equal(postit_1, postit_2) {
    expect(postit_1.is_same_as(postit_2)).toBe(true);
}



function clone_postit(postit) {
    let json = JSON.stringify(postit);
    return Postit.from_JSON(json);
}

async function test_pile_merging(pile_1_string, pile_2_string, expected_items_string) {
    let result = [];
    let {pile_1, pile_2} = await create_piles(pile_1_string, pile_2_string);
    return pile_merger.merge(pile_1, pile_2);
}

async function create_piles(pile_1_string, pile_2_string) {

    async function create_new_postit(text) {
        let result = new Postit(text);
        await delay(1);
        return result;
    }


    function find_postit_and_modifier_by_text(postits, text) {
        let search_modifier = extract_modifier(text);
        let search_text = search_modifier ? text.split(search_modifier)[0] : text;

        let postit =  postits.find((postit) => {
            let postit_modifier = extract_modifier(postit.text);
            let postit_search_text = postit_modifier ? postit.text.split(postit_modifier)[0] : postit.text;
            return postit_search_text === search_text;
        });

        let postit_modifier = postit ? extract_modifier(postit.text): undefined;

        return {postit, postit_modifier};
    }

    function extract_modifier(text) {
        let result;
        let last_char = text.charAt(text.length - 1);
        if ("-*".includes(last_char)) result = last_char;
        return result;
    }




    let pile_1 = new Pile();
    let pile_2 = new Pile();

    function delay(ms=2) {
        return new Promise((r) => setTimeout(r, ms));
    }

    async function create_cloned_postit(postit, item_string) {
        let cloned_postit = clone_postit(postit);
        let postit_text = postit.text;
        let modifier = extract_modifier(postit_text);
        cloned_postit.text = item_string;
        if (modifier === '*') {
            await delay(1);
            //we need an incremented last_uppdate;
            postit.text = postit_text;
        }
        return cloned_postit;
    }

    async function fill_pile(pile, pile_items_string, other_pile) {
        let item_strings = pile_items_string.split(',');
        for (let item_string of item_strings) {
            let {postit, postit_modifier} = find_postit_and_modifier_by_text(other_pile.all, item_string);
            if (!postit) {
                let {postit:deleted_postit, postit_modifier} = find_postit_and_modifier_by_text(other_pile.basket, item_string);
                if (deleted_postit) {
                    postit = await create_cloned_postit(deleted_postit, item_string);
                } else {
                    postit = await create_new_postit(item_string);
                }
            } else {
                postit = await create_cloned_postit(postit, item_string);
            }
            pile.push(postit);
            if (extract_modifier(item_string) === '-') {
                pile.pop();
            }
        }
    }

    if (pile_1_string !== '_') {
        await fill_pile(pile_1, pile_1_string, pile_2);
    }

    if (pile_2_string !== '_') {
        await fill_pile(pile_2, pile_2_string, pile_1);
    }

    return {pile_1, pile_2}
}


describe('test_pile_merging-function', () => {

    describe('create_piles', () => {
        test('_ / _ => [], []', async () => {
            let {pile_1, pile_2} = await create_piles('_', '_');
            expect(pile_1.all.length).toBe(0);
            expect(pile_2.all.length).toBe(0);
        });

        test('1 / _ => [1], []', async () => {
            let {pile_1, pile_2} = await create_piles('1', '_');
            expect(pile_1.all.length).toBe(1);
            expect(pile_2.all.length).toBe(0);

            expect(pile_1.all[0].text).toBe('1');
        });

        test('_ / 1 => [], [1]', async () => {
            let {pile_1, pile_2} = await create_piles('_', '1');
            expect(pile_1.all.length).toBe(0);
            expect(pile_2.all.length).toBe(1);

            expect(pile_2.all[0].text).toBe('1');
        });

        test('1 / 1 => [1], [1]', async () => {
            let {pile_1, pile_2} = await create_piles('1', '1');
            expect(pile_1.all.length).toBe(1);
            expect(pile_2.all.length).toBe(1);

            let postit_1 = pile_1.all[0];
            expect(postit_1.text).toBe('1');
            let postit_2 = pile_2.all[0];
            expect(postit_2.text).toBe('1');

            expect_to_be_equal(postit_1, postit_2);
        });

        test('1,2 / 1,2 => [1,2], [1,2]', async () => {
            let {pile_1, pile_2} = await create_piles('1,2', '1,2');
            expect(pile_1.all.length).toBe(2);
            expect(pile_2.all.length).toBe(2);

            let postit_1 = pile_1.all[0];
            expect(postit_1.text).toBe('1');
            let postit_2 = pile_2.all[0];
            expect(postit_2.text).toBe('1');
            let postit_3 = pile_1.all[1];
            expect(postit_3.text).toBe('2');
            let postit_4 = pile_2.all[1];
            expect(postit_4.text).toBe('2');

            expect_to_be_equal(postit_1, postit_2);
            expect_to_be_equal(postit_3, postit_4);
        });

        test('1,2 / 1 => [1,2], [1]', async () => {
            let {pile_1, pile_2} = await create_piles('1,2', '1');
            expect(pile_1.all.length).toBe(2);
            expect(pile_2.all.length).toBe(1);

            expect(pile_1.all[0].text).toBe('1');
            expect(pile_1.all[1].text).toBe('2');

            expect(pile_2.all[0].text).toBe('1');
        });

        test('1 / 1,2 => [1], [1,2]', async () => {
            let {pile_1, pile_2} = await create_piles('1', '1,2');
            expect(pile_1.all.length).toBe(1);
            expect(pile_2.all.length).toBe(2);

            let postit_1 = pile_1.all[0];
            expect(postit_1.text).toBe('1');

            let postit_2 = pile_2.all[0];
            expect(postit_2.text).toBe('1');
            expect(pile_2.all[1].text).toBe('2');

            expect_to_be_equal(postit_1, postit_2);
        });

        test('1,2 / 1,2,3 => [1,2], [1,2,3', async () => {
            let {pile_1, pile_2} = await create_piles("1,2", "1,2,3");
            expect(pile_1.all.length + pile_2.all.length).toBe(5);
            expect(pile_1.all[0].is_equal_with(pile_2.all[0])).toBe(true);
            expect(pile_1.all[1].is_equal_with(pile_2.all[1])).toBe(true);
            expect(pile_2.all[2].text).toBe("3");
        });

        test('1 / 1* => [1], [1*]', async () => {
            let {pile_1, pile_2} = await create_piles('1', '1*');
            expect(pile_1.all.length).toBe(1);
            expect(pile_2.all.length).toBe(1);

            let postit_1 = pile_1.all[0];
            let postit_2 = pile_2.all[0];

            expect_to_be_the_same_but_different(postit_1, postit_2);
        });

        test('1* / 1 => [1*], [1]', async () => {
            let {pile_1, pile_2} = await create_piles('1*', '1');
            expect(pile_1.all.length).toBe(1);
            expect(pile_2.all.length).toBe(1);

            let postit_1 = pile_1.all[0];
            let postit_2 = pile_2.all[0];

            expect_to_be_the_same_but_different(postit_1, postit_2)
            expect(postit_1.last_update).toBeGreaterThan(postit_2.last_update);
        });

        test('1,2* / 1,2 => [1,2*], [1,2]', async () => {
            let {pile_1, pile_2} = await create_piles('1,2*', '1,2');
            expect(pile_1.all.length).toBe(2);
            expect(pile_2.all.length).toBe(2);

            let postit_1 = pile_1.all[0];
            let postit_2 = pile_1.all[1];
            let postit_3 = pile_2.all[0];
            let postit_4 = pile_2.all[1];

            expect_to_be_equal(postit_1, postit_3);
            expect_to_be_the_same_but_different(postit_2, postit_4);
        });

        test('1,2 / 1,2* => [1,2], [1,2*]', async () => {
            let {pile_1, pile_2} = await create_piles('1,2', '1,2*');
            expect(pile_1.all.length).toBe(2);
            expect(pile_2.all.length).toBe(2);

            let postit_1 = pile_1.all[0];
            let postit_2 = pile_1.all[1];
            let postit_3 = pile_2.all[0];
            let postit_4 = pile_2.all[1];

            expect_to_be_equal(postit_1, postit_3);
            expect_to_be_the_same_but_different(postit_2, postit_4);
        });

        test('1,2    1*,2*    1*,2*', async () => {
            let merged_pile = await test_pile_merging('1,2', '1*,2*')
            expect(merged_pile.all.length).toBe(2);
            expect(merged_pile.all[0].text).toBe('1*');
            expect(merged_pile.all[1].text).toBe('2*');
        });

        test('1,2 / 2,1 => [1,2],[2,1]', async () => {
            let {pile_1, pile_2} = await create_piles('1,2', '2,1');
            expect(pile_1.all.length).toBe(2);
            expect(pile_2.all.length).toBe(2);

            let postit_1 = pile_1.all[0];
            let postit_2 = pile_1.all[1];
            let postit_3 = pile_2.all[0];
            let postit_4 = pile_2.all[1];

            expect_to_be_equal(postit_1, postit_4);
            expect_to_be_equal(postit_2, postit_3);
        });

        test('1- / 1 => [],[1]', async () => {
            let {pile_1, pile_2} = await create_piles('1-', '1');
            expect(pile_1.all.length).toBe(0);
            expect(pile_2.all.length).toBe(1);

            let postit_1 = pile_1.basket[0];
            let postit_2 = pile_2.all[0];

            expect_to_be_the_same_but_different(postit_1, postit_2);
        });

        test('1 / 1- => [1],[]', async () => {
            let {pile_1, pile_2} = await create_piles('1', '1-');
            expect(pile_1.all.length).toBe(1);
            expect(pile_2.all.length).toBe(0);

            let postit_1 = pile_1.all[0];
            let postit_2 = pile_2.basket[0];

            expect_to_be_the_same_but_different(postit_1, postit_2);
        });

        test('1,2,3 / 1,2-,3- => [1,2,3], [1]', async () => {
            let {pile_1, pile_2} = await create_piles('1,2,3', '1,2-,3-');
            expect(pile_1.all.length).toBe(3);
            expect(pile_2.all.length).toBe(1);
            expect(pile_2.basket.length).toBe(2);

            let postit_1 = pile_1.all[0];
            let postit_2 = pile_1.all[1];
            let postit_3 = pile_1.all[2];
            let postit_4 = pile_2.all[0];
            let postit_5 = pile_2.basket[0];
            let postit_6 = pile_2.basket[1];

            expect_to_be_equal(postit_1,postit_4);
            expect_to_be_the_same_but_different(postit_2,postit_5);
            expect_to_be_the_same_but_different(postit_3,postit_6);

        });

    });

    describe('create_piles acceptance', () => {

        test('1,2,3,4*,5,6*,7-,8,9       1*,2-,3-,4,5,6,7-,8,9*', async () => {
            let {pile_1, pile_2} = await create_piles("1,2,3,4*,5,6*,7-,8,9", "1*,2-,3-,4,5,6,7-,8,9*");
            expect(pile_1.all.length + pile_2.all.length).toBe(14);
            expect(pile_1.basket.length).toBe(1);
            expect(pile_2.basket.length).toBe(3);
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

            expect(pile_1.basket[0].is_same_as(pile_2.basket[2])).toBe(true);
            expect(pile_1.all[1].is_same_as(pile_2.basket[0])).toBe(true);
            expect(pile_1.all[2].is_same_as(pile_2.basket[1])).toBe(true);

        });

        test('1,2*,3,4,5-,6,7*,8,9      1,2,3,4*,5,6,7,8-,9', async () => {
            let {pile_1, pile_2} = await create_piles( '1,2*,3,4,5-,6,7*,8,9', '1,2,3,4*,5,6,7,8-,9');
            expect(pile_1.all.length + pile_2.all.length).toBe(16);
            expect(pile_1.basket.length).toBe(1);
            expect(pile_2.basket.length).toBe(1);
            expect(pile_1.all[0].is_same_as(pile_2.all[0])).toBe(true);
            expect(pile_1.all[0].is_equal_with(pile_2.all[0])).toBe(true);
            expect(pile_1.all[1].is_same_as(pile_2.all[1])).toBe(true);
            expect(pile_1.all[1].is_equal_with(pile_2.all[1])).toBe(false);
            expect(pile_1.all[2].is_same_as(pile_2.all[2])).toBe(true);
            expect(pile_1.all[2].is_equal_with(pile_2.all[2])).toBe(true);
            expect(pile_1.all[3].is_same_as(pile_2.all[3])).toBe(true);
            expect(pile_1.all[3].is_equal_with(pile_2.all[3])).toBe(false);
            expect(pile_1.all[4].is_same_as(pile_2.all[5])).toBe(true);
            expect(pile_1.all[4].is_equal_with(pile_2.all[5])).toBe(true);
            expect(pile_1.all[5].is_same_as(pile_2.all[6])).toBe(true);
            expect(pile_1.all[5].is_equal_with(pile_2.all[6])).toBe(false);
            expect(pile_1.all[7].is_same_as(pile_2.all[7])).toBe(true);
            expect(pile_1.all[7].is_equal_with(pile_2.all[7])).toBe(true);

            expect(pile_1.all[6].text).toBe('8');
            expect(pile_2.all[4].text).toBe('5');

            expect(pile_1.basket[0].is_same_as(pile_2.all[4])).toBe(true);
            expect(pile_2.basket[0].is_same_as(pile_1.all[6])).toBe(true);

        });

        test('1,2,3,7,8,9 / 1*,-8,-9 => [1,2,3,7,8,9], [1*]', async () => {
            let {pile_1, pile_2} = await create_piles( '1,2,3,7,8,9', '1*,8-,9-');
            expect(pile_1.all.length).toBe(6);
            expect(pile_2.all.length).toBe(1);

        });

    });
});

beforeEach(() => {
    pile_merger = new PileMerger();
});

describe.skip('changed postits', () => {


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

    test('1,2    1*    1*,2', async () => {
        let merged_pile = await test_pile_merging('1,2', '1*')
        expect(merged_pile.all.length).toBe(2);
        expect(merged_pile.all[0].text).toBe('1*');
        expect(merged_pile.all[1].text).toBe('2');
    });

    test('1,2    1*,2    1*,2', async () => {
        let merged_pile = await test_pile_merging('1,2', '1*,2')
        expect(merged_pile.all.length).toBe(2);
        expect(merged_pile.all[0].text).toBe('1*');
        expect(merged_pile.all[1].text).toBe('2');
    });

    test('1*,2    1,2    1*,2', async () => {
        let merged_pile = await test_pile_merging('1*,2', '1,2')
        expect(merged_pile.all.length).toBe(2);
        expect(merged_pile.all[0].text).toBe('1*');
        expect(merged_pile.all[1].text).toBe('2');
    });

    test('1*,2    1    1*,2', async () => {
        let merged_pile = await test_pile_merging('1*,2', '1')
        expect(merged_pile.all.length).toBe(2);
        expect(merged_pile.all[0].text).toBe('1*');
        expect(merged_pile.all[1].text).toBe('2');
    });

    test('1    1*,2    1*,2', async () => {
        let merged_pile = await test_pile_merging('1', '1*,2')
        expect(merged_pile.all.length).toBe(2);
        expect(merged_pile.all[0].text).toBe('1*');
        expect(merged_pile.all[1].text).toBe('2');
    });

    test('1*,2    1,2*    1*,2*', async () => {
        let merged_pile = await test_pile_merging('1*,2', '1,2*')
        expect(merged_pile.all.length).toBe(2);
        expect(merged_pile.all[0].text).toBe('1*');
        expect(merged_pile.all[1].text).toBe('2*');
    });

    test('1*,2*    1,2    1*,2*', async () => {
        let merged_pile = await test_pile_merging('1*,2*', '1,2')
        expect(merged_pile.all.length).toBe(2);
        expect(merged_pile.all[0].text).toBe('1*');
        expect(merged_pile.all[1].text).toBe('2*');
    });

    test('1,2*    2,3    1,2*,3', async () => {
        let merged_pile = await test_pile_merging('1,2*', '2,3')
        expect(merged_pile.all.length).toBe(3);
        expect(merged_pile.all[0].text).toBe('1');
        expect(merged_pile.all[1].text).toBe('2*');
        expect(merged_pile.all[2].text).toBe('3');
    });

    test('1,2    2*,3    1,2*,3', async () => {
        let merged_pile = await test_pile_merging('1,2', '2*,3')
        expect(merged_pile.all.length).toBe(3);
        expect(merged_pile.all[0].text).toBe('1');
        expect(merged_pile.all[1].text).toBe('2*');
        expect(merged_pile.all[2].text).toBe('3');
    });

    test('1,2,3     1,3,2    1,2,3', async () => {
        let merged_pile = await test_pile_merging('1,2,3', '1,3,2')
        expect(merged_pile.all.length).toBe(3);
        expect(merged_pile.all[0].text).toBe('1');
        expect(merged_pile.all[1].text).toBe('2');
        expect(merged_pile.all[2].text).toBe('3');
    });

})
describe.skip('deleted postits', () => {
    test('_        1-            _', async () => {
        let merged_pile = await test_pile_merging('_', '1-');
        expect(merged_pile.all.length).toBe(0);
    });

    test('1     1-      _', async () => {
        let merged_pile = await test_pile_merging('1', '1-');
        expect(merged_pile.all.length).toBe(0);
    });

    test.skip('1,2*,3,4,6,7*,8,9    1,2,3,4*,5,6,7,9    1,2*,3,4*,6,7*,9', async () => {
        let merged_pile = await test_pile_merging('1,2*,3,4,5-,6,7*,8,9', '1,2,3,4*,5,6,7,8-,9')
        expect(merged_pile.all.length).toBe(7);
        expect(merged_pile.all[0].text).toBe('1');
        expect(merged_pile.all[1].text).toBe('2*');
        expect(merged_pile.all[2].text).toBe('3');
        expect(merged_pile.all[3].text).toBe('4*');
        expect(merged_pile.all[4].text).toBe('6');
        expect(merged_pile.all[5].text).toBe('7*');
        expect(merged_pile.all[6].text).toBe('9');
    });

    test('1,2,3     1,-2,3', async () => {
        let merged_pile = await test_pile_merging('1,2,3', '1,2-,3')
        let postits = merged_pile.all;
        expect(merged_pile.all.length).toBe(3);
        expect(merged_pile.all[0].text).toBe('1');
        expect(merged_pile.all[1].text).toBe('2');
        expect(merged_pile.all[2].text).toBe('3');

    });

})
