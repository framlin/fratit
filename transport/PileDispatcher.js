const Pile = require("../postit/Pile");

class PileDispatcher{
    #remote_piles = null;

    constructor(remote_piles) {
        this.#remote_piles = remote_piles;
    }

    set remote_piles(remote_piles) {
        this.#remote_piles = remote_piles;
    }
    get remote_piles() {
        return this.#remote_piles;
    }

    receive(remote_pile) {
        return new Pile();
    }
    send(remote_pile, remote_address) {

    }

}
const REMOTE_PILES = [
    {ip: '192.168.188.62', name:'verdi-22.04'}
]
const PILE_DISPATCHER = new PileDispatcher(REMOTE_PILES);
module.exports = PILE_DISPATCHER;