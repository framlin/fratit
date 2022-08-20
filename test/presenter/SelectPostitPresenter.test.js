// const SelectPostitPresenter = require("../../ui/electron/select_postit/SelectPostitPresenter");
test('SelectPostitPresenterCreation', () => {

    let use_case_stub = {
        presenter: {
            on_select: (index) => index
        }
    }
    let controller_factory_stub = {}
    let interactor_factory_stub = {}
    let post_office_stub = {}

    // let select_postit_presenter = new SelectPostitPresenter(use_case_stub, controller_factory_stub,interactor_factory_stub,post_office_stub);
    //
    // expect(select_postit_presenter).toBeInstanceOf(SelectPostitPresenter);

})