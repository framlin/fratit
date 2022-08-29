class PileDispatcher{
    #remote_piles = null;
    #sender = null;
    #POST_OFFICE = null;


    set remote_piles(remote_piles) {
        this.#remote_piles = remote_piles;
    }

    set post_office(post_office) {
        this.#POST_OFFICE = post_office;
    }

    set sender(sender){
        this.#sender = sender;
    }

    set remote_piles(remote_piles) {
        this.#remote_piles = remote_piles;
    }

    get local_pile() {
        return this.#POST_OFFICE.pile;
    }

    get remote_piles() {
        return this.#remote_piles;
    }

    async fetch(remote_pile_ip_address) {
        return await this.#sender.get_pile();
    }

    send(remote_pile, remote_pile_ip_address) {
        this.#sender.post(remote_pile);
    }

    receive(received_pile) {
        this.#POST_OFFICE.pile = received_pile;
    }

}

const PILE_DISPATCHER = new PileDispatcher();
module.exports = PILE_DISPATCHER;