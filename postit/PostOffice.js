const Pile = require("./Pile");
const Postit = require("./Postit");
const PileStorage = require("./PileStorage");

class PostOffice {
    #pile;
    #pile_storage;
    #id
    constructor(pile, pile_storage) {
        this.#pile = pile;
        this.#pile_storage = pile_storage;
        this.#id = 0;
    }

    get pile() {
        return this.#pile;
    }

    load() {
        this.#pile_storage.load();
    }

    save() {
        this.#pile_storage.save();
        // console.log(this.#pile);
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
const POST_OFFICE = new PostOffice(PILE, PILE_STORAGE);

module.exports = POST_OFFICE;