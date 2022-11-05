type TODO = any;

export class PileDispatcher{
    private _remote_piles : TODO= null;
    private _sender: TODO = null;
    private _POST_OFFICE: TODO = null;


    set post_office(post_office: TODO) {
        this._POST_OFFICE = post_office;
    }

    set sender(sender: TODO){
        this._sender = sender;
    }

    set remote_piles(remote_piles: TODO) {
        this._remote_piles = remote_piles;
    }

    get local_pile() {
        return this._POST_OFFICE.pile;
    }

    get remote_piles() {
        return this._remote_piles;
    }

    async fetch(remote_pile_ip_address: TODO) {
        return await this._sender.get_pile(remote_pile_ip_address);
    }

    send(remote_pile: TODO, remote_pile_ip_address: TODO) {
        this._sender.post(remote_pile, remote_pile_ip_address);
    }

    receive(received_pile: TODO) {
        this._POST_OFFICE.pile = received_pile;
        this._POST_OFFICE.save();
    }
}

export const PILE_DISPATCHER = new PileDispatcher();
module.exports = {PILE_DISPATCHER};