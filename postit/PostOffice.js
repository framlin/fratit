const Pile = require("./Pile");
const Postit = require("./Postit");
const PileStorage = require("./PileStorage");

class PostOffice {
    #pile;
    #id
    constructor(pile) {
        this.#pile = pile;
        this.#id = 0;
    }

    get pile() {
        return this.#pile;
    }

    create_postit() {
        return new Postit();
    }

    //for the Singleton-Test
    get _id_() {
        return this.#id;
    }

    //for the Singleton-Test
    set _id_(id) {
        this.#id = id;
    }
}

const PILE = new Pile();
const PILE_STORAGE = new PileStorage(PILE);
const POST_OFFICE = new PostOffice(PILE);

module.exports = POST_OFFICE;