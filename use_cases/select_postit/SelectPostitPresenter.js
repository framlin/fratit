const PostitPresenter = require("../PostitPresenter");

class SelectPostitPresenter extends PostitPresenter{
    constructor(use_case, view, controller) {
        super(use_case, view, controller);
    }

    postit_select(index) {
        this._controller.postit_select(index);
    }

    //@ResponseBoundary
    present(postits) {
        if (postits instanceof Array) {
            this._view.display(postits);
        }
    }
}

module.exports = SelectPostitPresenter;