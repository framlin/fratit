const Pile = require("./Pile");





class PileSyncer {
    sync(pile_1, pile_2) {
        let {smaller_pile, larger_pile} = this.order_piles(pile_1, pile_2);
        return this.merge(larger_pile, smaller_pile);
    }

    merge(larger_pile, smaller_pile) {
        let outstanding_pile = this.get_outstanding_pile(larger_pile, smaller_pile);
        let remaining_pile = this.filter_deleted_postits(larger_pile, smaller_pile);
        return this.concat(remaining_pile, outstanding_pile);
    }

    get_outstanding_pile(larger_pile, smaller_pile) {
        let result = new Pile();

        for (let smaller_pile_postit of smaller_pile.all) {
            let found_larger_pile_postit = search_in_larger_pile(smaller_pile_postit);
            if (!found_larger_pile_postit) {
                this._if_postit_not_deleted_push_to_result(smaller_pile_postit, larger_pile, result)
            } else {
                if_is_newer_push_to_result(smaller_pile_postit, found_larger_pile_postit);
            }
        }

        function search_in_larger_pile(smaller_pile_postit) {
            let larger_pile_postit = larger_pile.all.find((postit) => postit.is_same_as(smaller_pile_postit));
            return larger_pile_postit;
        }

        function if_is_newer_push_to_result(smaller_pile_postit, larger_pile_postit) {
            if (smaller_pile_postit.last_update > larger_pile_postit.last_update) {
                let index = larger_pile.all.indexOf(larger_pile_postit);
                larger_pile.take(index);
                result.push(smaller_pile_postit);
            }
        }

        return result;
    }

    is_longer_or_equal_sized(pile_1, pile_2) {
        return pile_1.all.length >= pile_2.all.length;
    }

    order_piles(pile_1, pile_2) {
        let larger_pile = pile_1,
            smaller_pile = pile_2;

        if (!this.is_longer_or_equal_sized(larger_pile, smaller_pile)) {
            smaller_pile = pile_1;
            larger_pile = pile_2
        }
        return {smaller_pile, larger_pile};
    }

    filter_deleted_postits(larger_pile, smaller_pile) {
        let result = new Pile();
        for (let posit of larger_pile.all) {
            this._if_postit_not_deleted_push_to_result(posit, smaller_pile, result);
        }
        return result;
    }

    _if_postit_not_deleted_push_to_result(postit, pile, result) {
        if (!pile.basket.find((_postit) => _postit.is_same_as(postit))) {
            result.push(postit);
        }
    }

    concat(pile, outstanding_pile) {
        let result_postits = pile.all.concat(outstanding_pile.all);
        return new Pile(result_postits);
    }

}

module.exports = PileSyncer;