const SelectPostitController = require("../../../use_cases/select_postit/SelectPostitController");

test('creation', () => {
    let controller = new SelectPostitController();
    expect(controller).toBeInstanceOf(SelectPostitController);
});

test("running the use_cse", () => {
    let interactor_execute_called = false;
    let controller = new SelectPostitController({
        //interactor
        execute: () => {
            interactor_execute_called = true;
        }
    });

    controller.run_use_case();
    expect(interactor_execute_called).toBe(true);

});

test("passing index to interactor", () => {
    let interactor_postit_selected_called = false;
    let passed_index = 0;

    let controller = new SelectPostitController({
        postit_selected: (index) => {
            interactor_postit_selected_called = true;
            passed_index = index
        }
    });

    controller.postit_selected(42);
    expect(interactor_postit_selected_called).toBe(true);
    expect(passed_index).toBe(42);
})

