const PostitController = require("../PostitController");

class SelectPostitController extends PostitController {
    constructor(interactor) {
        super(interactor)
    }

    postit_select(index) {
        this._interactor.postit_select(index);
    }
}

module.exports = SelectPostitController;