

const Pile = require("./Pile");
const Postit = require("./Postit");

class PostOffice {
    #pile;
    #storage;
    #id
    #remote_post_offices = [
        {ip: '192.168.188.62', name:'verdi-22.04'}
    ]
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

    get remote_post_offices() {
        return this.#remote_post_offices;
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