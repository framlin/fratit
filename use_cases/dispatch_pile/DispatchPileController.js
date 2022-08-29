const PostitController = require("../PostitController");

class DispatchPileController extends PostitController {
    submit(remote_pile_address) {
        debugger
        this._interactor.remote_pile_selected(remote_pile_address);
    }
}
module.exports = DispatchPileController;