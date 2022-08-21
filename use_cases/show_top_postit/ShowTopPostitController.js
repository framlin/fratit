const PostitController = require("../PostitController");

class ShowTopPostitController extends PostitController {
    postit_delete() {
        this._interactor.delete_postit();
    }
}

module.exports = ShowTopPostitController;