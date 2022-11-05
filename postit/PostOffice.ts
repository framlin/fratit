import {Pile} from "./Pile";
import {Postit} from "./Postit";

type TODO = any;
export class PostOffice {
    private _pile: TODO;
    private _storage: TODO;
    private _id: TODO;

    constructor(pile: TODO) {
        this._pile = pile;
        this._id = 0;
    }

    set storage(storage: TODO) {
        this._storage = storage;
        this._storage.PILE = this._pile;
    }

    get pile() {
        return this._pile;
    }

    set pile(pile) {
        this._pile = pile;
        if (this._storage) {
            this._storage.PILE = this._pile;
        }
    }

    //for the Singleton-Test
    get _id_() {
        return this._id;
    }

    //for the Singleton-Test
    set _id_(id) {
        this._id = id;
    }

    load() {
        if (this._storage) {
            this._storage.load();
        } else {
            throw new Error("NO PILE_STORAGE");
        }
    }

    save() {
        if (this._storage) {
            this._storage.PILE = this._pile;
            this._storage.save();
        } else {
            throw new Error("NO PILE_STORAGE");
        }
    }

    create_postit() {
        return new Postit();
    }
}

const PILE = new Pile();
export const POST_OFFICE = new PostOffice(PILE);

module.exports = {POST_OFFICE};