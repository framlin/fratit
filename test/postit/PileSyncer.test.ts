import {PILE_SYNCER} from "../../postit/PileSyncer";
import {Postit} from "../../postit/Postit";
import {Pile} from "../../postit/Pile";

type TODO = any;

function expect_to_be_the_same_but_different(postit_1: TODO, postit_2: TODO) {
    let same = postit_1.is_same_as(postit_2);
    let different = !(postit_1.is_equal_with(postit_2));
    expect(same && different).toBe(true);
}

function expect_to_be_equal(postit_1: TODO, postit_2: TODO) {
    expect(postit_1.is_same_as(postit_2)).toBe(true);
}

function clone_postit(postit: TODO) {
    let json = JSON.stringify(postit);
    return Postit.from_JSON(json);
}

async function test_pile_syncing(pile_1_string: TODO, pile_2_string: TODO, expected_items_string: TODO) {
    let {pile_1, pile_2} = await create_piles(pile_1_string, pile_2_string);
    let synced_pile = PILE_SYNCER.sync(pile_1, pile_2);
    let postits = synced_pile.all;
    let expected_texts = expected_items_string === "" ? [] : expected_items_string.split(',');
    expect(postits.length).toBe(expected_texts.length);
    for (let i = 0; i < expected_texts.length; i++) {
        expect(postits[i].text).toBe(expected_texts[i]);
    }
}

async function create_piles(pile_1_string: TODO, pile_2_string: TODO) {

    async function create_new_postit(text: TODO) {
        let result = new Postit(text);
        await delay();
        return result;
    }

    function find_postit_and_modifier_by_text(postits: TODO, text: TODO) {
        let search_modifier = extract_modifier(text);
        let search_text = search_modifier ? text.split(search_modifier)[0] : text;
        let postit =  postits.find((postit: TODO) => {
            let postit_modifier = extract_modifier(postit.text);
            let postit_search_text = postit_modifier ? postit.text.split(postit_modifier)[0] : postit.text;
            return postit_search_text === search_text;
        });

        return postit;
    }

    function extract_modifier(text: TODO) {
        let result;
        let last_char = text.charAt(text.length - 1);
        if ("-*".includes(last_char)) result = last_char;
        return result;
    }

    function delay(ms: TODO=2) {
        return new Promise((r) => setTimeout(r, ms));
    }

    async function create_cloned_postit(postit: TODO, item_string: TODO) {
        let cloned_postit = clone_postit(postit);
        let postit_text = postit.text;
        let modifier = extract_modifier(postit_text);
        if (cloned_postit.text !== item_string) cloned_postit.text = item_string;
        if (modifier === '*') {
            await delay();
            //we need an incremented last_uppdate;
            postit.text = postit_text;
        }
        return cloned_postit;
    }

    async function fill_pile(pile: TODO, pile_items_string: TODO, other_pile: TODO) {
        let item_strings = pile_items_string.split(',');
        for (let item_string of item_strings) {
            let postit = find_postit_and_modifier_by_text(other_pile.all, item_string);
            if (!postit) {
                let deleted_postit = find_postit_and_modifier_by_text(other_pile.basket, item_string);
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

    let pile_1 = new Pile();
    let pile_2 = new Pile();

    if (pile_1_string !== '_') {
        await fill_pile(pile_1, pile_1_string, pile_2);
    }

    if (pile_2_string !== '_') {
        await fill_pile(pile_2, pile_2_string, pile_1);
    }

    return {pile_1, pile_2}
}

describe('test_pile_syncing-function', () => {
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

            let postit_1 = pile_1.all[0];
            expect(postit_1.text).toBe('1');
            let postit_2 = pile_1.all[1];
            expect(postit_2.text).toBe('2');

            let postit_3 = pile_2.all[0];
            expect(postit_3.text).toBe('1');

            expect(postit_1.is_equal_with(postit_3)).toBe(true);
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

describe('simple cases and untouched postits', () => {
    test('_ / _ => []', async () => {
        await test_pile_syncing('_', '_', '');
    });

    test('1 / _ => [1]', async () => {
        await test_pile_syncing('1', '_', '1');
    });

    test('_ / 1 => [1]', async () => {
        await test_pile_syncing('_', '1', '1');
    });

    test('1 / 1 => [1]', async () => {
        await test_pile_syncing('1', '1', '1');
    });

    test('1 / 1,2 => [1,2]', async () => {
        await test_pile_syncing('1', '1,2', '1,2');
    });

    test('1,2 / 1 => 1,2', async () => {
        await test_pile_syncing('1,2', '1', '1,2');
    });

    test('1,2 / 3 => 1,2,3', async () => {
        await test_pile_syncing('1,2', '3', '1,2,3');
    });

    test('1 / 2,3 => 2,3,1', async () => {
        await test_pile_syncing('1', '2,3', '2,3,1');
    });
    test('1,3 / 2 => 1,3,2', async () => {
        await test_pile_syncing('1,3', '2', '1,3,2');
    });

});

describe('deleted postits', () => {
    test('1,2-,3 / 2 => 1,3', async () => {
        await test_pile_syncing('1,2-,3', '2', '1,3');
    });

    test('1,2,3 / 2- => 1,3', async () => {
        await test_pile_syncing('1,2,3', '2-', '1,3');
    });
});

describe('changed postits', () => {
    test('1 / 1* => 1*', async () => {
        await test_pile_syncing('1', '1*', '1*');
    });

    test('1* / 1 => 1*', async () => {
        await test_pile_syncing('1*', '1', '1*');
    });

    test('1,2 / 1,2* => 1,2*', async () => {
        await test_pile_syncing('1,2', '1,2*', '1,2*');
    });

    test('1,2 / 2* => 1,2*', async () => {
        await test_pile_syncing('1,2', '2*', '1,2*');
    });
});

describe('sync acceptance', () => {
    test('1,2*,3,4,6,7*,8,9 / 1,2,3,4*,5,6-,7,9    1,2*,3,4*,5,7*,8,9', async () => {
        await test_pile_syncing('1,2*,3,4,6,7*,8,9', '1,2,3,4*,5,6-,7,9', '1,2*,3,7*,8,9,4*,5');
    });
})
