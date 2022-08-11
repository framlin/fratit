const Postit = require("./Postit");

class Pile {
    #items = [];

    constructor(initial_items) {
        if (initial_items instanceof Array) {
            this.#items = initial_items;
        }
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
        return new Pile(postits);
    }

    push(item) {
        this.#items.push(item);
    }

    pop() {
        return this.#items.pop();
    }

    put(index, item) {
        this.#items.splice(index, 0, item);
    }

    take(index) {
        return this.#items.splice(index, 1)[0];
    }

    clear() {
        this.#items = [];
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
            "items": JSON.stringify(this.#items)
        }

    }

}

module.exports = Pile;