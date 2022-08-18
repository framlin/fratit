const ControllerFactory = require("../../use_cases/ControllerFactory");
const AddPostitController = require("../../use_cases/add_postit/AddPostitController");
const SelectPostitController = require("../../use_cases/select_postit/SelectPostitController");

describe('thet the controllerFactory creates certain Controllers', () => {
    let interactor_stub = {}
    it('delivers a AddPostitController', () => {
        let add_postit_controller = ControllerFactory.create("add_postit", interactor_stub);
        expect(add_postit_controller).toBeInstanceOf(AddPostitController);
    });
    it('delivers a SelectPostitController', () => {
        let select_postit_controller = ControllerFactory.create("select_postit", interactor_stub);
        expect(select_postit_controller).toBeInstanceOf(SelectPostitController);
    });
})