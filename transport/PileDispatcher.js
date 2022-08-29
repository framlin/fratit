class PileDispatcher{
    #remote_piles = null;
    #sender = null;

    constructor(remote_piles) {
        this.#remote_piles = remote_piles;
    }

    set sender(sender){
        this.#sender = sender;
    }

    set remote_piles(remote_piles) {
        this.#remote_piles = remote_piles;
    }
    get remote_piles() {
        return this.#remote_piles;
    }

    async receive(remote_pile_ip) {
        return await this.#sender.get_pile();
    }

    send(remote_pile, remote_address) {

    }

}
const REMOTE_PILES = [
    {ip: '192.168.188.62', name:'verdi-22.04'}
]
const PILE_DISPATCHER = new PileDispatcher(REMOTE_PILES);
module.exports = PILE_DISPATCHER;