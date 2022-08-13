const AddPostitController = require("../../use_cases/add_postit/AddPostitController");


const PostitController = {
    add_postit: AddPostitController
}

class ControllerFactory {
    // static create_add_postit_controller(request_boundary) {
    //     // return new AddPostitController(request_boundary);
    //     return ControllerFactory.create("add_postit", request_boundary);
    // }
    //
    static create(controller, interactor) {
        return new PostitController[controller](interactor);
    }

}


module.exports = ControllerFactory;