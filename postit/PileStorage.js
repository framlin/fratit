const { writeFile, readFile } = require('fs/promises');

class PileStorage {
    #PILE
    constructor(PILE) {
        this.#PILE = PILE;
        PILE.storage = this;
        this.load().then();
    }

    async save() {
        let serialized_pile = JSON.stringify(this.#PILE);
        console.log(serialized_pile);
        await writeFile('data/pile.json', serialized_pile);
    }

    async load() {
        const file = await readFile('data/pile.json', 'utf8');
        try {
            this.#PILE.load_from_JSON(file);
        } catch ( e ) {}
    }
}


module.exports = PileStorage;
