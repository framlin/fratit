import {Pile} from "../postit/Pile";

const { writeFile, readFile, access, mkdir } = require('fs/promises');
const path = require('path');

export class PileStorage {
    private _PILE: Pile|undefined;
    private _path: string | undefined;

    config (storage_path: string) {
        this._path = storage_path;
        access(this._path).catch(() => {
            mkdir(this._path).then();
        });
    }

    set PILE (PILE: Pile) {
        this._PILE = PILE;
    }

    async save() {
        if (!this._PILE) throw new Error("NO PILE");
        let serialized_pile = JSON.stringify(this._PILE);
        await writeFile(path.join(this._path, 'pile.json'), serialized_pile);
    }

    async load() {
        if (!this._PILE) throw new Error("NO PILE");
        const file = await readFile(path.join(this._path, 'pile.json'), 'utf8');
        try {
            this._PILE.load_from_JSON(file);
        } catch ( e ) {}
    }
}

export const PILE_STORAGE = new PileStorage();

module.exports = {PILE_STORAGE};
