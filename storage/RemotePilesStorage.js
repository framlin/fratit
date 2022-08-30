const { writeFile, readFile, access, mkdir } = require('fs/promises');
const path = require('path');

class RemotePilesStorage{

    #remote_piles;
    #path

    get remote_piles() {
        return this.#remote_piles;
    }

    set remote_piles(remote_piles) {
        this.#remote_piles = remote_piles;
    }

    config (storage_path) {
        this.#path = storage_path;
        access(this.#path).catch(() => {
            mkdir(this.#path).then();
        });
    }

    async save() {
        if (!this.#remote_piles) throw new Error("NO ADDRESS_LIST");
        let serialized_addresses = JSON.stringify(this.#remote_piles);
        await writeFile(path.join(this.#path, 'remote_piles.json'), serialized_addresses);
    }

    async load() {
        // if (!this.#remote_piles) throw new Error("NO ADDRESS_LIST");
        const file = await readFile(path.join(this.#path, 'remote_piles.json'), 'utf8');
        try {
            this.#remote_piles = JSON.parse(file);
            console.log(this.#remote_piles);
        } catch ( e ) {}
    }


}

const REMOTE_PILES_STORAGE = new RemotePilesStorage();

module.exports = REMOTE_PILES_STORAGE;
