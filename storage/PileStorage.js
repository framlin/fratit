const { writeFile, readFile } = require('fs/promises');

class PileStorage {
    #PILE

    set PILE (PILE) {
        this.#PILE = PILE;
        this.load().then();
    }

    async save() {
        if (!this.#PILE) throw new Error("NO PILE");
        let serialized_pile = JSON.stringify(this.#PILE);
        await writeFile('data/pile.json', serialized_pile);
    }

    async load() {
        if (!this.#PILE) throw new Error("NO PILE");
        const file = await readFile('data/pile.json', 'utf8');
        try {
            this.#PILE.load_from_JSON(file);
        } catch ( e ) {}
    }
}

const PILE_STORAGE = new PileStorage();

module.exports = PILE_STORAGE;
