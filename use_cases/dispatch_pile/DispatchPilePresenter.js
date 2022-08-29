const PostitPresenter = require("../PostitPresenter");

class DispatchPilePresenter extends PostitPresenter{
    present_success(remote_pile_address){
        this._view.dispatch_succeeded(remote_pile_address);
    }

    submit(remote_pile_address){
        this._controller.submit(remote_pile_address);
    }
}

module.exports = DispatchPilePresenter;