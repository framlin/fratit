import {ControllerFactory} from "../../factories/ControllerFactory";
import {AddPostitController} from "../../use_cases/add_postit/AddPostitController";
import {SelectPostitController} from "../../use_cases/select_postit/SelectPostitController";
import {ShowTopPostitController} from "../../use_cases/show_top_postit/ShowTopPostitController";

type TODO = any;

let interactor_stub = {}

function expect_instance_of(use_case_name: TODO, class_name: TODO) {
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