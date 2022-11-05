import {PostitPresenter} from "../../use_cases/PostitPresenter";
import {ViewSpy as view_stub} from "./stubs/ViewSpy";
import {ControllerSpy as controller_stub} from "./stubs/ControllerSpy";

type TODO = any;

let stubbed_view: TODO;
let stubbed_controller: TODO;
let post_office_stub : TODO= {};

let postit_presenter: TODO;

beforeEach(() => {
    stubbed_controller = new controller_stub();
    stubbed_view = new view_stub();
    let use_case_stub = {name: 'postit'}
    // @ts-ignore
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
