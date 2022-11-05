import {PostitPresenter} from "../PostitPresenter";
type TODO = any;
export class DispatchPilePresenter extends PostitPresenter{
    present_success(remote_pile_address: TODO) {
        this._view.dispatch_succeeded(remote_pile_address);
    }

    submit(remote_pile_address: TODO) {
        this._controller.submit(remote_pile_address);
    }
}

module.exports = {DispatchPilePresenter};