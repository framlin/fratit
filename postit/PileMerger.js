const Pile = require("./Pile");

function find_same_postit(postits, postit) {
    return postits.find((pattern) => pattern.is_same_as(postit))
}

function find_equal_postit(postits, postit) {
    return postits.find((pattern) => pattern.is_equal_with(postit))
}

function is_deleted_from(pile, postit) {
    let pile_basket = pile.basket;
    return find_same_postit(pile.basket, postit);
}

class PileMerger {
    merge(pile_1, pile_2) {
        let result;
        let pile_1_items = pile_1.all;
        let pile_2_items = pile_2.all;
        let result_items = [];
        if (pile_1_items.length === 0) {
            result = new Pile(pile_2_items);
        } else {
            for (let pile_1_postit of pile_1_items) {
                result_items.push(pile_1_postit);
            }
            if ((pile_2_items.length === 0) && (pile_2.basket.length > 0)) {
                for (let deleted_postit of pile_2.basket) {
                    let outstanding_postit = find_same_postit(result_items, deleted_postit);
                    if (outstanding_postit) {
                        let index = result_items.indexOf(outstanding_postit);
                        result_items.splice(index, 1);
                    }
                }
            }
            for (let pile_2_postit of pile_2_items) {
                let same_postit_in_result = find_same_postit(result_items, pile_2_postit);
                if (same_postit_in_result){
                    let equal_postit_in_result = find_equal_postit(result_items, pile_2_postit);
                    if (!equal_postit_in_result) {
                        let last_update_in_result =  same_postit_in_result.last_update;
                        let last_update_of_pile_2_postit = pile_2_postit.last_update;
                        if (last_update_in_result < last_update_of_pile_2_postit) {
                           let index = result_items.indexOf(same_postit_in_result);
                            result_items[index] = pile_2_postit
                        }
                    }
                } else if (is_deleted_from(pile_1, pile_2_postit)){
                    //
                }
                else {
                    result_items.push(pile_2_postit);
                }
            }
            result = new Pile(result_items);
        }
        return result;
    }
}

module.exports = PileMerger;