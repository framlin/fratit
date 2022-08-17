const InteractorFactory = require("../../use_cases/InteractorFactory");
const AddPostitInteractor = require("../../use_cases/add_postit/AddPostitInteractor");
const SelectPostitInteractor = require("../../use_cases/select_postit/SelectPostitInteractor");

describe('what it delivers', () => {

    it('delivers AddPostitInteractor', () => {
        let post_office_stub = {};
        InteractorFactory.config(post_office_stub);
        let presenter_stub = {};
        let add_postit_presenter = InteractorFactory.create("add_postit", presenter_stub);
        expect(add_postit_presenter).toBeInstanceOf(AddPostitInteractor);
    });

    it('delivers SelectPostitInteractor', () => {
        let post_office_stub = {};
        InteractorFactory.config(post_office_stub);
        let presenter_stub = {};
        let add_postit_presenter = InteractorFactory.create("select_postit", presenter_stub);
        expect(add_postit_presenter).toBeInstanceOf(SelectPostitInteractor);
    });

});