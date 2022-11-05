const { writeFile, readFile, access, mkdir } = require('fs/promises');
const path = require('path');

type RemotePileAddress = {ip: string; name: string};

export class RemotePilesStorage{

    private _remote_piles: RemotePileAddress[] | undefined ;
    private _path: string | undefined;

    get remote_piles() : RemotePileAddress[] | undefined{
        if (this._remote_piles) return this._remote_piles;

    }

    set remote_piles(remote_piles:  RemotePileAddress[] | undefined) {
        this._remote_piles = remote_piles;
    }

    config (storage_path: string) {
        this._path = storage_path;
        access(this._path).catch(() => {
            mkdir(this._path).then();
        });
    }

    async save() {
        if (!this._remote_piles) throw new Error("NO ADDRESS_LIST");
        let serialized_addresses = JSON.stringify(this._remote_piles);
        await writeFile(path.join(this._path, 'remote_piles.json'), serialized_addresses);
    }

    async load() {
        // if (!this._remote_piles) throw new Error("NO ADDRESS_LIST");
        const file = await readFile(path.join(this._path, 'remote_piles.json'), 'utf8');
        try {
            this._remote_piles = JSON.parse(file);
            console.log(this._remote_piles);
        } catch ( e ) {}
    }
}

export const REMOTE_PILES_STORAGE = new RemotePilesStorage();

module.exports = {REMOTE_PILES_STORAGE};
