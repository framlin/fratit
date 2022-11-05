import {Postit} from "./Postit";

type TODO = any;

export class Pile {
    private _items: TODO = [];
    private _last_update = 0;
    private _basket: TODO = [];

    constructor(initial_items?: TODO, last_update?: TODO) {
        if (initial_items instanceof Array) {
            this._items = initial_items;
        }
        if (typeof last_update !== 'undefined') {
            this._last_update = last_update;
        }
    }

    get last_update() {
        return this._last_update;
    }

    get size() {
        return this._items.length;
    }

    get top() {
        return this._items[this._items.length - 1];
    }

    get all() {
        return this._items;
    }

    get basket() {
        return this._basket;
    }

    push(item: TODO) {
        this._items.push(item);
        this._last_update = Date.now();
    }

    pop() {
        this._last_update = Date.now();
        let popped_item = this._items.pop();
        this._basket.push(popped_item);
        return popped_item;
    }

    put(index: TODO, item: TODO) {
        this._items.splice(index, 0, item);
        this._last_update = Date.now();
    }

    take(index: TODO) {
        this._last_update = Date.now();
        let taken_item = this._items.splice(index, 1)[0];
        this._basket.push(taken_item);
        return taken_item;
    }

    clear() {
        for (let item of this._items) {
            this._basket.push(item);
        }
        this._items = [];
        this._last_update = Date.now();
    }

    find_same(pattern: TODO) {
        return this._items.find((item: TODO) => item.is_same_as(pattern));
    }

    find_equal(pattern: TODO) {
        return this._items.find((item: TODO) => item.is_equal_with(pattern));
    }

    static from_JSON(json_string: TODO) {
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

    load_from_JSON(json_string: TODO) {
        let obj = JSON.parse(json_string);
        let items = JSON.parse(obj.items);
        let postits = [];
        for (let item of items) {
            let json_item = JSON.stringify(item);
            let postit = Postit.from_JSON(json_item);
            postits.push(postit);
        }
        this._items = postits;
    }

    toJSON() {
        return {
            "last_update": this._last_update,
            "items": JSON.stringify(this._items)
        }
    }

}


module.exports = {Pile};