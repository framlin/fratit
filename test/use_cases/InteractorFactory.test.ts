import {InteractorFactory} from "../../factories/InteractorFactory";
import {AddPostitInteractor} from "../../use_cases/add_postit/AddPostitInteractor";
import {SelectPostitInteractor} from "../../use_cases/select_postit/SelectPostitInteractor";
import {ShowTopPostitInteractor} from "../../use_cases/show_top_postit/ShowTopPostitInteractor";

type TODO = any;
function test_interactor_creation(name: TODO, type: TODO) {
    let post_office_stub = {};
    // @ts-ignore
    InteractorFactory.config(post_office_stub);
    let use_case = {name: name, presenter: {}};
    let interactor = InteractorFactory.create(use_case);
    expect(interactor).toBeInstanceOf(type);
}

describe('what it delivers', () => {

    it('delivers AddPostitInteractor', () => {
        test_interactor_creation('add_postit', AddPostitInteractor);
    });

    it('delivers SelectPostitInteractor', () => {
        test_interactor_creation('select_postit', SelectPostitInteractor);
    });

    it('delivers ShowTopPostitInteractor', () => {
        test_interactor_creation('show_top_postit', ShowTopPostitInteractor);
    });


});