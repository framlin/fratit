const { writeFile, readFile, access, constants, mkdir } = require('fs/promises');
// const {existsSync} = require('fs');

const path = require('path');
class PileStorage {
    #PILE
    #path

    constructor () {
        this.#path = path.join(__dirname, 'data');
        access(this.#path).catch(() => {
            mkdir(this.#path).then();
        });
    }

    set PILE (PILE) {
        this.#PILE = PILE;
        this.load().then();
    }

    async save() {
        if (!this.#PILE) throw new Error("NO PILE");
        let serialized_pile = JSON.stringify(this.#PILE);
        await writeFile(path.join(__dirname, 'data/pile.json'), serialized_pile);
    }

    async load() {
        if (!this.#PILE) throw new Error("NO PILE");
        const file = await readFile(path.join(__dirname, 'data/pile.json'), 'utf8');
        try {
            this.#PILE.load_from_JSON(file);
        } catch ( e ) {}
    }
}

const PILE_STORAGE = new PileStorage();

module.exports = PILE_STORAGE;
