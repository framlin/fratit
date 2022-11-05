import {PileStorage} from "../storage/PileStorage";
import {Pile} from "./Pile";
import {Postit} from "./Postit";

export class PostOffice {
    private _pile: Pile;
    private _storage: PileStorage|undefined;
    private _id: number;

    constructor(pile: Pile) {
        this._pile = pile;
        this._id = 0;
    }

    set storage(storage: PileStorage) {
        this._storage = storage;
        this._storage.PILE = this._pile;
    }

    get pile() : Pile {
        return this._pile;
    }

    set pile(pile: Pile) {
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
    set _id_(id: number) {
        this._id = id;
    }

    load() {
        if (this._storage) {
            this._storage.load().then();
        } else {
            throw new Error("NO PILE_STORAGE");
        }
    }

    save() {
        if (this._storage) {
            this._storage.PILE = this._pile;
            this._storage.save().then();
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