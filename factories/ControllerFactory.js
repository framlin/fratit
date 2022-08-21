const AddPostitController = require("../use_cases/add_postit/AddPostitController");
const SelectPostitController = require("../use_cases/select_postit/SelectPostitController");
const ShowTopPostitController = require("../use_cases/show_top_postit/ShowTopPostitController");

const PostitController = {
    add_postit: (interactor) => new AddPostitController(interactor),
    select_postit: (interactor) => new SelectPostitController(interactor),
    show_top_postit: (interactor) => new ShowTopPostitController(interactor),
}

class ControllerFactory {
    static create(controller, interactor) {
        return PostitController[controller](interactor);
    }
}

module.exports = ControllerFactory;