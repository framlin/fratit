import {PostitInteractor} from "../PostitInteractor";
type TODO = any;
export class DispatchPileInteractor extends PostitInteractor{

    _PILE_DISPATCHER: TODO = null;
    _PILE_SYNCER: TODO = null;

    constructor(use_case: TODO, POST_OFFICE: TODO, PILE_DISPATCHER: TODO, PILE_SYNCER: TODO) {
        super(use_case, POST_OFFICE);
        this._PILE_DISPATCHER = PILE_DISPATCHER;
        this._PILE_SYNCER = PILE_SYNCER;
    }

    execute() {
        //get remote-post-office-list
        let remote_piles_list = this._PILE_DISPATCHER.remote_piles;
        //prepare remote-office-structure ????
        //call presenter.present -> pass remote-office-structure
        this.presenter.present(remote_piles_list);
    }

    async remote_pile_selected(remote_pile_address: TODO) {
        await this.sync_with_remote_pile(remote_pile_address);
    }

    async sync_with_remote_pile(remote_pile_address: TODO) {
        let remote_pile  = await this._PILE_DISPATCHER.fetch(remote_pile_address);
        let local_pile = this._POST_OFFICE.pile;
        let synced_pile = this._PILE_SYNCER.sync(local_pile, remote_pile);
        this._POST_OFFICE.pile = synced_pile;
        this._POST_OFFICE.save();
        this._PILE_DISPATCHER.send(synced_pile, remote_pile_address);
        this.presenter.present_success(remote_pile_address)
    }

}

module.exports = {DispatchPileInteractor};