const AddPostitPresenter = require("../use_cases/add_postit/AddPostitPresenter");
const SelectPostitPresenter = require("../use_cases/select_postit/SelectPostitPresenter");
const ShowTopPostitPresenter = require("../use_cases/show_top_postit/ShowTopPostitPresenter");
const DispatchPilePresenter = require("../use_cases/dispatch_pile/DispatchPilePresenter");

const PostitPresenters = {
    add_postit: (use_case, view, controller, post_office) => {
        return new AddPostitPresenter(use_case, view, controller, post_office);
    },
    select_postit: (use_case, view, controller, post_office) => {
        return new SelectPostitPresenter(use_case, view, controller, post_office);
    },
    show_top_postit: (use_case, view, controller, post_office) => {
        return new ShowTopPostitPresenter(use_case, view, controller, post_office);
    },
    dispatch_pile: (use_case, view, controller, post_office) => {
        return new DispatchPilePresenter(use_case, view, controller, post_office);
    },

}

class PresenterFactory {
    static create(use_case) {
        return PostitPresenters[use_case];
    }

}

module.exports = PresenterFactory;