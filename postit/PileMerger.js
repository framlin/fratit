const Pile = require("./Pile");

class PileMerger {
    merge(pile_1, pile_2) {
        let result;
        let elems_1 = pile_1.all;
        let elems_2 = pile_2.all;
        if (elems_1.length === 0) {
            result = new Pile(elems_2);
        } else {
            for (let elem2 of elems_2) {
                let match = false;
                for (let elem1 of elems_1) {
                    if (elem2.is_equal_with(elem1)){
                        match = true;
                        break;
                    }
                }
                if (!match) elems_1.push(elem2);
                // if (!elem.is_equal_with(elems_1[0]))
                //     elems_1.push(elem);
            }
            result = new Pile(elems_1);
        }
        return result;
    }
}

module.exports = PileMerger;