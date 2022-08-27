const Pile = require("./Pile");

function is_empty(pile) {
    return pile.all.length === 0;
}

function is_longer_or_equal_sized(pile_1, pile_2) {
    return pile_1.all.length >= pile_2.all.length;
}

function is_newer_or_equal(postit_1, postit_2) {
    return postit_1.last_update >= postit_2.last_update;
}

function order_piles(pile_1, pile_2) {
    let larger_pile = pile_1,
        smaller_pile = pile_2;

    if (!is_longer_or_equal_sized(larger_pile, smaller_pile)) {
        smaller_pile = pile_1;
        larger_pile = pile_2
    }
    return {smaller_pile, larger_pile};
}

function get_outstanding_pile(larger_pile, smaller_pile) {
    let result = new Pile();
    for (let smaller_pile_postit of smaller_pile.all) {
        let larger_pile_postit = larger_pile.all.find((postit) => postit.is_same_as(smaller_pile_postit));
        if (!larger_pile_postit) {
            if (!larger_pile.basket.find((postit) => postit.is_same_as(smaller_pile_postit))) {
                result.push(smaller_pile_postit);
            }
        } else {
            if (smaller_pile_postit.last_update > larger_pile_postit.last_update) {
                let index = larger_pile.all.indexOf(larger_pile_postit);
                larger_pile.take(index);
                result.push(smaller_pile_postit);
            }
        }
    }
    return result;
}

function concat(pile, outstanding_pile) {
    let result_postits = pile.all.concat(outstanding_pile.all);
    return new Pile(result_postits);
}

function filter_deleted_postits(larger_pile, smaller_pile) {
    let result = new Pile();
    for (let larger_pile_postit of larger_pile.all) {
        if (!smaller_pile.basket.find((postit) => postit.is_same_as(larger_pile_postit))) {
            result.push(larger_pile_postit);
        }
    }
    return result;
}

function choose_newer_postits(pile_1, pile_2) {
    let {larger_pile, smaller_pile} = order_piles(pile_1, pile_2)

    for (let smaller_pile_postit of smaller_pile.all) {
        let larger_pile_postit = larger_pile.all.find((postit) => postit.is_same_as(smaller_pile_postit));
        if (larger_pile_postit) {
            if (larger_pile_postit.last_update > smaller_pile_postit.last_update) {
                let index = smaller_pile.all.indexOf(smaller_pile_postit);
                smaller_pile.take(index);
            } else if (larger_pile_postit.last_update < smaller_pile_postit.last_update){
                let index = larger_pile.all.indexOf(larger_pile_postit);
                larger_pile.take(index);
            }
        }
    }

    let {larger_pile:larger_newer_pile, smaller_pile:smaller_newer_pile} = order_piles(larger_pile, smaller_pile);
    return {larger_newer_pile, smaller_newer_pile}
}

function merge(larger_pile, smaller_pile) {
    let outstanding_pile = get_outstanding_pile(larger_pile, smaller_pile);
    let remaining_pile = filter_deleted_postits(larger_pile, smaller_pile);
    return concat(remaining_pile, outstanding_pile);
}

class PileSyncer {
    sync(pile_1, pile_2) {
        let result;
        let {smaller_pile, larger_pile} = order_piles(pile_1, pile_2);
        result = merge(larger_pile, smaller_pile);
        return result;
    }
}

module.exports = PileSyncer;