

const Pile = require("./Pile");
const Postit = require("./Postit");

class PostOffice {
    #pile;
    #storage;
    #id
    constructor(pile) {
        this.#pile = pile;
        this.#id = 0;
    }

    set storage(storage) {
        this.#storage = storage;
        this.#storage.PILE = this.#pile;
    }

    get pile() {
        return this.#pile;
    }

    set pile(pile) {
        this.#pile = pile;
    }

    load() {
        if (this.#storage) {
            this.#storage.load();
        } else {
            throw new Error("NO PILE_STORAGE");
        }
    }

    save() {
        if (this.#storage) {
            this.#storage.save();
        } else {
            throw new Error("NO PILE_STORAGE");
        }
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
const POST_OFFICE = new PostOffice(PILE);

module.exports = POST_OFFICE;