const ShowTopPostitController = require("../../../use_cases/show_top_postit/ShowTopPostitController");

class interactor_stub{
    execute_called = false;
    delete_postit_called = false;
    execute() {
        this.execute_called = true;
    }
    delete_postit() {
        this.delete_postit_called = true;
    }
}
let stubbed_interactor = new interactor_stub();
let show_top_postit_controller;
beforeEach(() => {
    show_top_postit_controller = new ShowTopPostitController(stubbed_interactor);
});

it('calls execute on interactor, if run_use_case is called', () => {
    show_top_postit_controller.run_use_case();
    expect(stubbed_interactor.execute_called).toBe(true);
});

it('calls delete_postit on interactor, if posted_deleted is called', () => {
    show_top_postit_controller.postit_delete();
    expect(stubbed_interactor.delete_postit_called).toBe(true);
})