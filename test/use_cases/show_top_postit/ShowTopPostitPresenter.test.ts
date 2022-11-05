import {ShowTopPostitPresenter} from "../../../use_cases/show_top_postit/ShowTopPostitPresenter";
import {ViewSpy as view_stub} from "../stubs/ViewSpy";
import {ControllerSpy as controller_stub} from "../stubs/ControllerSpy";

type TODO = any;

let stubbed_view: TODO;
let stubbed_controller: TODO;
let post_office_stub : TODO= {};

class show_top_postit_controller_stub extends controller_stub{
    postit_deleted_called = false;
    postit_delete() {
        this.postit_deleted_called = true;
    }
}

let show_top_postit_presenter: TODO;
beforeEach(() => {
    stubbed_controller = new show_top_postit_controller_stub();
    stubbed_view = new view_stub();
    let use_case_stub = {name: 'show_top_postit'}
    // @ts-ignore
    show_top_postit_presenter = new ShowTopPostitPresenter(use_case_stub, stubbed_view, stubbed_controller, post_office_stub)
});

it('can be created and callback is registered and calls run_use_case', () => {
    expect(show_top_postit_presenter).toBeInstanceOf(ShowTopPostitPresenter);
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



