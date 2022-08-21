const InteractorFactory = require("../../factories/InteractorFactory");
const AddPostitInteractor = require("../../use_cases/add_postit/AddPostitInteractor");
const SelectPostitInteractor = require("../../use_cases/select_postit/SelectPostitInteractor");
const ShowTopPostitInteractor = require("../../use_cases/show_top_postit/ShowTopPostitInteractor");

function test_interactor_creation(name, type) {
    let post_office_stub = {};
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