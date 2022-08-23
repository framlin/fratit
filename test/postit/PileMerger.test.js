const PileMerger = require("../../postit/PileMerger");
let pile_merger;
beforeEach(() => {
    pile_merger = new PileMerger();
})
it('can be created', () => {
    let pile_merger = new PileMerger();
    expect(pile_merger).toBeInstanceOf(PileMerger);
});

class pile_stub{
    elems = []
    constructor(elems) {
        this.elems = elems;
    }
    get all() {
        return this.elems;
    }
}

class postit_stub {
    last_update = 0;
    id = 0;
    get last_update(){
        return this.last_update;
    }

    get id() {
        return this.id;
    }
}

function expect_merge(elems_pile_1, elems_pile_2, elems_result_pile) {
    let pile_1 = new pile_stub(elems_pile_1);
    let pile_2 = new pile_stub(elems_pile_2);

    let merged_pile = pile_merger.merge(pile_1, pile_2);
    expect(merged_pile.all).toStrictEqual(elems_result_pile);

}

it ('returns an empty pile, merging two empty piles', () => {
    expect_merge([],[],[]);
});

it('returns a pile with the postit of pile_1, if pile_1 has 1 postit and pile_2 is empty', () => {
    expect_merge([1],[],[1]);
});

