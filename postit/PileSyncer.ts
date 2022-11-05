import {Pile} from "./Pile";
type TODO = any;

export class PileSyncer {
    sync(pile_1: TODO, pile_2: TODO) {
        let {smaller_pile, larger_pile} = this.order_piles(pile_1, pile_2);
        return this.merge(larger_pile, smaller_pile);
    }

    merge(larger_pile: TODO, smaller_pile: TODO) {
        let outstanding_pile = this.get_outstanding_pile(larger_pile, smaller_pile);
        let remaining_pile = this.filter_deleted_postits(larger_pile, smaller_pile);
        return this.concat(remaining_pile, outstanding_pile);
    }

    get_outstanding_pile(larger_pile: TODO, smaller_pile: TODO) {
        let result = new Pile();

        for (let smaller_pile_postit of smaller_pile.all) {
            let found_larger_pile_postit = search_in_larger_pile(smaller_pile_postit);
            if (!found_larger_pile_postit) {
                this._if_postit_not_deleted_push_to_result(smaller_pile_postit, larger_pile, result)
            } else {
                if_is_more_current_push_to_result(smaller_pile_postit, found_larger_pile_postit);
            }
        }

        function search_in_larger_pile(smaller_pile_postit: TODO) {
            let larger_pile_postit = larger_pile.all.find((postit: TODO) => postit.is_same_as(smaller_pile_postit));
            return larger_pile_postit;
        }

        function if_is_more_current_push_to_result(smaller_pile_postit: TODO, larger_pile_postit: TODO) {
            if (smaller_pile_postit.is_more_current(larger_pile_postit)) {
                let index = larger_pile.all.indexOf(larger_pile_postit);
                larger_pile.take(index);
                result.push(smaller_pile_postit);
            }
        }

        return result;
    }

    is_longer_or_equal_sized(pile_1: TODO, pile_2: TODO) {
        return pile_1.all.length >= pile_2.all.length;
    }

    order_piles(pile_1: TODO, pile_2: TODO) {
        let larger_pile = pile_1,
            smaller_pile = pile_2;

        if (!this.is_longer_or_equal_sized(larger_pile, smaller_pile)) {
            smaller_pile = pile_1;
            larger_pile = pile_2;
        }
        return {smaller_pile, larger_pile};
    }

    filter_deleted_postits(larger_pile: TODO, smaller_pile: TODO) {
        let result = new Pile();
        for (let posit of larger_pile.all) {
            this._if_postit_not_deleted_push_to_result(posit, smaller_pile, result);
        }
        return result;
    }

    _if_postit_not_deleted_push_to_result(postit: TODO, pile: TODO, result: TODO) {
        if (!pile.basket.find((_postit: TODO) => _postit.is_same_as(postit))) {
            result.push(postit);
        }
    }

    concat(pile: TODO, outstanding_pile: TODO) {
        let result_postits = pile.all.concat(outstanding_pile.all);
        return new Pile(result_postits);
    }

}

export const PILE_SYNCER = new PileSyncer()
module.exports = {PILE_SYNCER};