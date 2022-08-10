const AddPostitController = require("./add_postit/AddPostitController");

class ControllerFactory{
    static create_add_postit_controller(request_boundary) {
        return new AddPostitController(request_boundary);
    }
}

module.exports = ControllerFactory;