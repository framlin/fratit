const PostitController = require("../PostitController");

class SelectPostitController extends PostitController {
    constructor(interactor) {
        super(interactor)
    }

    run_use_case() {
        this._interactor.execute();
    }

    postit_selected(index) {
        this._interactor.postit_selected(index);
    }
}

module.exports = SelectPostitController;