const AddPostitPresenter = require("./add_postit/AddPostitPresenter");
const SelectPostitPresenter = require("./select_postit/SelectPostitPresenter");

const PostitPresenters = {
    add_postit: (use_case, view, controller, post_office) => {
        return new AddPostitPresenter(use_case, view, controller, post_office);
    },
    select_postit: (use_case, view, controller, post_office) => {
        return new SelectPostitPresenter(use_case, view, controller, post_office);
    }

}

class PresenterFactory {
    static create(use_case) {
        return PostitPresenters[use_case];
    }

}

module.exports = PresenterFactory;