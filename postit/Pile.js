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

    push(item) {
        this.#items.push(item);
    }

    get top() {
        return this.#items[this.#items.length - 1];
    }

    get all () {
        return this.#items;
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
}

module.exports = Pile