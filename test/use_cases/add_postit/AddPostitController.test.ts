import {AddPostitController} from "../../../use_cases/add_postit/AddPostitController";
type TODO = any;
test('creation', () => {
    // @ts-ignore
    let controller = new AddPostitController();
    expect(controller).toBeInstanceOf(AddPostitController);
});

test('adding a postit', () => {
    let interactor_execute_called = false;
    let postit_data = 0;
    let controller = new AddPostitController({
        execute: (data: TODO) => {
            interactor_execute_called = true;
            postit_data = data;
        }
    });
    controller.add_postit(42);
    expect(interactor_execute_called).toBe(true);
    expect(postit_data).toBe(42);
})