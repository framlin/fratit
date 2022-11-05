import {PostitController} from "../PostitController";
type TODO = any;

export class DispatchPileController extends PostitController {
    submit(remote_pile_address: TODO) {
        this._interactor.remote_pile_selected(remote_pile_address).then();
    }
}
module.exports = {DispatchPileController};