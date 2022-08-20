const PostitPresenter = require("../PostitPresenter");

class SelectPostitPresenter extends PostitPresenter{
    constructor(use_case, view, controller, post_office) {
        super(use_case, view, controller, post_office);

        this._view.once('ready-to-show', () => {
            this.run_use_case()
        })
    }

    on_select(index) {
        this._controller.postit_selected(index);
        this._POST_OFFICE.save();
    }

    run_use_case() {
        this._controller.run_use_case();
    }

    //@ResponseBoundary
    present(postits) {
        if (postits instanceof Array) {
            this._view.display(postits);
        }
    }


}

module.exports = SelectPostitPresenter;