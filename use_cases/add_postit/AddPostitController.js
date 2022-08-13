const PostitController = require("../PostitController");

class AddPostitController extends PostitController{
    constructor(interactor) {
        super(interactor)
    }

    add_postit(postit_data) {
        this._interactor.execute(postit_data);
    }
}

module.exports = AddPostitController;