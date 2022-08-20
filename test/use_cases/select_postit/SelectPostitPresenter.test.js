// const SelectPostitPresenter = require("../../ui/electron/select_postit/SelectPostitPresenter");
const SelectPostitPresenter = require("../../../use_cases/select_postit/SelectPostitPresenter");

class controller_stub {
    postit_selected_called = false
    passed_index = -1;
    run_use_case_called = false;

    run_use_case() {
        this.run_use_case_called = true;
    }

    postit_selected(index) {
        this.postit_selected_called = true;
        this.passed_index = index;
    }
}

let stubbed_controller = new controller_stub();

class post_office_stub {
    save_called = false;

    save() {
        this.save_called = true;
    }
}

let stubbed_post_office = new post_office_stub()
let use_case_stub = {
    name: 'select_postit',
    presenter: null
}

class view_stub{
    display_called = false;
    arg_passed = null;
    once (e, callback) {
        callback();
    }
    display(elem) {
        this.display_called = true;
        this.arg_passed = elem;
    }
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
    select_postit_presenter.on_select(42);

    expect(stubbed_controller.postit_selected_called).toBe(true);
    expect(stubbed_controller.passed_index).toBe(42);
    expect(stubbed_post_office.save_called).toBe(true);
});

test('run_use_case', () => {
    select_postit_presenter.run_use_case()
    expect(stubbed_controller.run_use_case_called).toBe(true);
});

test('present not an array', () => {
    select_postit_presenter.present(42);
    expect(stubbed_view.display_called).toBe(false)
    expect(stubbed_view.arg_passed).toBe(null);
})

test('present an array', () => {
    select_postit_presenter.present([42]);
    expect(stubbed_view.display_called).toBe(true)
    expect(stubbed_view.arg_passed).toStrictEqual([42]);
})