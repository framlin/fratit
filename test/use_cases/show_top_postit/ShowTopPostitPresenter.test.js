const ShowTopPostitPresenterTest = require("../../../use_cases/show_top_postit/ShowTopPostitPresenter");
const view_stub = require("../stubs/ViewSpy");
const controller_stub = require("../stubs/ControllerSpy");

let stubbed_view;
let stubbed_controller;
let post_office_stub = {};

class show_top_postit_controller_stub extends controller_stub{
    postit_deleted_called = false;
    postit_delete() {
        this.postit_deleted_called = true;
    }
}

let show_top_postit_presenter;
beforeEach(() => {
    stubbed_controller = new show_top_postit_controller_stub();
    stubbed_view = new view_stub();
    let use_case_stub = {name: 'show_top_postit'}
    show_top_postit_presenter = new ShowTopPostitPresenterTest(use_case_stub, stubbed_view, stubbed_controller, post_office_stub)
});

it('can be created and callback is registered and calls run_use_case', () => {
    expect(show_top_postit_presenter).toBeInstanceOf(ShowTopPostitPresenterTest);
    expect(stubbed_view.register_event_called).toBe(true);
    expect(stubbed_view.registered_event).toBe('ready-to-show');
    expect(stubbed_controller.run_use_case_called).toBe(true);
});

it("calls display of it's view, when present is called", () => {
    show_top_postit_presenter.present([42]);
    expect(stubbed_view.display_called).toBe(true);
    expect(stubbed_view.passed_display_value).toStrictEqual([42]);
});

it('delegates posted_deleted to the controller', () => {
    show_top_postit_presenter.postit_delete();
    expect(stubbed_controller.postit_deleted_called).toBe(true);
});



