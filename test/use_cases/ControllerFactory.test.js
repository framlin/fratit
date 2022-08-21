const ControllerFactory = require("../../factories/ControllerFactory");
const AddPostitController = require("../../use_cases/add_postit/AddPostitController");
const SelectPostitController = require("../../use_cases/select_postit/SelectPostitController");
const ShowTopPostitController = require("../../use_cases/show_top_postit/ShowTopPostitController");

let interactor_stub = {}

function expect_instance_of(use_case_name, class_name) {
    let postit_controller = ControllerFactory.create(use_case_name, interactor_stub);
    expect(postit_controller).toBeInstanceOf(class_name);
}


describe('that the controllerFactory creates certain Controllers', () => {
    it('delivers a AddPostitController', () => {
        expect_instance_of("add_postit", AddPostitController);
    });
    it('delivers a SelectPostitController', () => {
        expect_instance_of("select_postit", SelectPostitController);
    });
    it('delivers a ShowTopPostitController', () => {
        expect_instance_of("show_top_postit", ShowTopPostitController);
    });
})