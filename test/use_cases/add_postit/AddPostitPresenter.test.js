const AddPostitPresenter = require("../../../use_cases/add_postit/AddPostitPresenter");
const SelectPostitPresenter = require("../../../use_cases/select_postit/SelectPostitPresenter");
const {add} = require("nodemon/lib/rules");
const post_office_stub = require("../stubs/post_office_stub");
const view_stub = require("../stubs/view_stub");
const controller_stub = require("../stubs/controller_stub");

class add_postit_controller_stub extends controller_stub{
    add_postit_called = false
    passed_value = -1;

    add_postit(value) {
        this.add_postit_called = true;
        this.passed_value = value;
    }
}

let stubbed_controller = new add_postit_controller_stub();
let stubbed_post_office = new post_office_stub();
let use_case_stub = {
    name: 'add_postit',
    presenter: null
}

let stubbed_view = new view_stub();

let add_postit_presenter
beforeEach(() => {
    add_postit_presenter = new AddPostitPresenter(
        use_case_stub, stubbed_view, stubbed_controller, stubbed_post_office
    );
});

test('AddPostitPresenterCreation', () => {
    expect(add_postit_presenter).toBeInstanceOf(AddPostitPresenter);
    expect(stubbed_controller.run_use_case_called).toBe(false);
});

test('on_submit', () => {
    add_postit_presenter.on_submit(42);

    expect(stubbed_controller.add_postit_called).toBe(true);
    expect(stubbed_controller.passed_value).toBe(42);
});

test('run_use_case', () => {
    add_postit_presenter.run_use_case()
    expect(stubbed_controller.run_use_case_called).toBe(true);
});

test('present', () => {
    add_postit_presenter.present(42);
    expect(stubbed_view.display_called).toBe(false)
    expect(stubbed_view.passed_display_value).toStrictEqual(null);
})