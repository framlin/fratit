const AddPostitController = require("../use_cases/add_postit/AddPostitController");
const SelectPostitController = require("../use_cases/select_postit/SelectPostitController");
const ShowTopPostitController = require("../use_cases/show_top_postit/ShowTopPostitController");
const DispatchPileController = require("../use_cases/dispatch_pile/DispatchPileController");

const PostitController = {
    add_postit: (interactor) => new AddPostitController(interactor),
    select_postit: (interactor) => new SelectPostitController(interactor),
    show_top_postit: (interactor) => new ShowTopPostitController(interactor),
    dispatch_pile: (interactor) => new DispatchPileController(interactor),
}

class ControllerFactory {
    static create(controller, interactor) {
        return PostitController[controller](interactor);
    }
}

module.exports = ControllerFactory;