const AddPostitController = require("../../../use_cases/add_postit/AddPostitController");
test('creation', () => {
    let controller = new AddPostitController();
    expect(controller).toBeInstanceOf(AddPostitController);
});

test('adding a postit', () => {
    let interactor_execute_called = false;
    let postit_data = 0;
    let controller = new AddPostitController({
        execute: (data) => {
            interactor_execute_called = true;
            postit_data = data;
        }
    });
    controller.add_postit(42);
    expect(interactor_execute_called).toBe(true);
    expect(postit_data).toBe(42);
})