const Postit = require("./Postit");

class Pile {
    #items = [];
    #last_update = 0;

    constructor(initial_items, last_update) {
        if (initial_items instanceof Array) {
            this.#items = initial_items;
        }
        if (typeof last_update !== 'undefined') {
            this.#last_update = last_update;
        }
    }

    get last_update() {
        return this.#last_update;
    }

    get size() {
        return this.#items.length;
    }

    get top() {
        return this.#items[this.#items.length - 1];
    }

    get all() {
        return this.#items;
    }

    static from_JSON(json_string) {
        let obj = JSON.parse(json_string);
        let items = JSON.parse(obj.items);
        let postits = [];
        for (let item of items) {
            let json_item = JSON.stringify(item);
            let postit = Postit.from_JSON(json_item);
            postits.push(postit);
        }
        return new Pile(postits, obj.last_update);
    }

    push(item) {
        this.#items.push(item);
        this.#last_update = Date.now();
    }

    pop() {
        this.#last_update = Date.now();
        return this.#items.pop();
    }

    put(index, item) {
        this.#items.splice(index, 0, item);
        this.#last_update = Date.now();
    }

    take(index) {
        this.#last_update = Date.now();
        return this.#items.splice(index, 1)[0];
    }

    clear() {
        this.#items = [];
        this.#last_update = Date.now();
    }

    load_from_JSON(json_string) {
        let obj = JSON.parse(json_string);
        let items = JSON.parse(obj.items);
        let postits = [];
        for (let item of items) {
            let json_item = JSON.stringify(item);
            let postit = Postit.from_JSON(json_item);
            postits.push(postit);
        }
        this.#items = postits;
    }

    toJSON() {
        return {
            "last_update": this.#last_update,
            "items": JSON.stringify(this.#items)
        }

    }

}

module.exports = Pile;