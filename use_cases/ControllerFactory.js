const AddPostitController = require("./add_postit/AddPostitController");
const SelectPostitController = require("./select_postit/SelectPostitController");

const PostitController = {
    add_postit: (interactor) => new AddPostitController(interactor),
    select_postit: (interactor) => new SelectPostitController(interactor),
}

class ControllerFactory {
    static create(controller, interactor) {
        return PostitController[controller](interactor);
    }
}

module.exports = ControllerFactory;