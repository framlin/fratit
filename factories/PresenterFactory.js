const AddPostitPresenter = require("../use_cases/add_postit/AddPostitPresenter");
const SelectPostitPresenter = require("../use_cases/select_postit/SelectPostitPresenter");
const ShowTopPostitPresenter = require("../use_cases/show_top_postit/ShowTopPostitPresenter");
const DispatchPilePresenter = require("../use_cases/dispatch_pile/DispatchPilePresenter");

const PostitPresenters = {
    add_postit: (use_case, view, controller) => {
        return new AddPostitPresenter(use_case, view, controller);
    },
    select_postit: (use_case, view, controller) => {
        return new SelectPostitPresenter(use_case, view, controller);
    },
    show_top_postit: (use_case, view, controller) => {
        return new ShowTopPostitPresenter(use_case, view, controller);
    },
    dispatch_pile: (use_case, view, controller) => {
        return new DispatchPilePresenter(use_case, view, controller);
    },

}

class PresenterFactory {
    static create(use_case) {
        return PostitPresenters[use_case];
    }

}

module.exports = PresenterFactory;