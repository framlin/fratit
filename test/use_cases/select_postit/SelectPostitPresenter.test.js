// const SelectPostitPresenter = require("../../ui/electron/select_postit/SelectPostitPresenter");
const SelectPostitPresenter = require("../../../use_cases/select_postit/SelectPostitPresenter");
const post_office_stub = require("../stubs/post_office_stub");
const view_stub = require("../stubs/view_stub");
const controller_stub = require("../stubs/controller_stub");

class select_postit_controller_stub extends controller_stub{
    postit_selected_called = false
    passed_index = -1;
    postit_select(index) {
        this.postit_selected_called = true;
        this.passed_index = index;
    }
}

let stubbed_controller = new select_postit_controller_stub();
let stubbed_post_office = new post_office_stub();
let use_case_stub = {
    name: 'select_postit',
    presenter: null
}


let stubbed_view = new view_stub();

let select_postit_presenter
beforeEach(() => {
    select_postit_presenter = new SelectPostitPresenter(
        use_case_stub, stubbed_view, stubbed_controller, stubbed_post_office
    );
});

test('SelectPostitPresenterCreation', () => {
    expect(select_postit_presenter).toBeInstanceOf(SelectPostitPresenter);
    expect(stubbed_controller.run_use_case_called).toBe(true);
});

test('on_select', () => {
    select_postit_presenter.postit_select(42);

    expect(stubbed_controller.postit_selected_called).toBe(true);
    expect(stubbed_controller.passed_index).toBe(42);
});

test('run_use_case', () => {
    select_postit_presenter.run_use_case()
    expect(stubbed_controller.run_use_case_called).toBe(true);
});

test('present not an array', () => {
    select_postit_presenter.present(42);
    expect(stubbed_view.display_called).toBe(false)
    expect(stubbed_view.passed_display_value).toBe(null);
});

test('present an array', () => {
    select_postit_presenter.present([42]);
    expect(stubbed_view.display_called).toBe(true)
    expect(stubbed_view.passed_display_value).toStrictEqual([42]);
});