const PostitPresenter = require("../PostitPresenter");

class AddPostitPresenter extends PostitPresenter{

    constructor(use_case, view, controller) {
        super(use_case, view, controller);
    }

    on_view_ready_to_show() {
        //must not do anything
    }

    on_submit(value) {
        this._controller.add_postit(value);
    }


    present(postit_data) {
        //must not do anything
    };

}

module.exports = AddPostitPresenter;