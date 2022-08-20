const InteractorFactory = require("../../use_cases/InteractorFactory");
const AddPostitInteractor = require("../../use_cases/add_postit/AddPostitInteractor");
const SelectPostitInteractor = require("../../use_cases/select_postit/SelectPostitInteractor");

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

});