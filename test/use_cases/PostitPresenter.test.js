const PostitPresenter = require("../../use_cases/PostitPresenter");
const view_stub = require("./stubs/view_stub");
const controller_stub = require("./stubs/controller_stub");

let stubbed_view;
let stubbed_controller;
let post_office_stub = {};

let postit_presenter;
beforeEach(() => {
    stubbed_controller = new controller_stub();
    stubbed_view = new view_stub();
    let use_case_stub = {name: 'postit'}
    postit_presenter = new PostitPresenter(use_case_stub, stubbed_view, stubbed_controller, post_office_stub)
});

test('that it can be created and registers ready-to-show event-handler', () => {
    expect(stubbed_view.register_event_called).toBe(true);
    expect(stubbed_view.registered_event).toBe('ready-to-show');
    expect(stubbed_controller.run_use_case_called).toBe(true);
});

it("will call run_use_case on it's controller on_view_ready_to_show'", () => {
    postit_presenter.on_view_ready_to_show();
    expect(stubbed_controller.run_use_case_called).toBe(true);
});

it("will call the controllers run_use_case when run_use_case is called", () => {
    postit_presenter.run_use_case();
    expect(stubbed_controller.run_use_case_called).toBe(true);
});

it('calls the display-method of the view, whe present is called', () => {
    postit_presenter.present([42]);
    expect(stubbed_view.display_called).toBe(true);
    expect(stubbed_view.passed_display_value).toStrictEqual([42])
});
