const PostitPresenter = require("../PostitPresenter");

class SelectPostitPresenter extends PostitPresenter{
    constructor(use_case, view, controller, post_office) {
        super(use_case, view, controller, post_office);
    }

    postit_select(index) {
        this._controller.postit_select(index);
        this._POST_OFFICE.save();
    }

    //@ResponseBoundary
    present(postits) {
        if (postits instanceof Array) {
            this._view.display(postits);
        }
    }


}

module.exports = SelectPostitPresenter;