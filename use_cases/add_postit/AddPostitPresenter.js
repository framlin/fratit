const PostitPresenter = require("../PostitPresenter");

class AddPostitPresenter extends PostitPresenter{

    constructor(use_case, view, controller , post_office) {
        super(use_case, view, controller, post_office);
    }

    on_submit(value) {
        this._controller.add_postit(value);
        this._POST_OFFICE.save();
    }


    present(postit_data) {
        //must not do anything
    };

}

module.exports = AddPostitPresenter;