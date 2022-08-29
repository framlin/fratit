const PostitController = require("../PostitController");

class DispatchPileController extends PostitController {
    submit(remote_pile_address) {
        this._interactor.remote_pile_selected(remote_pile_address).then();
    }
}
module.exports = DispatchPileController;