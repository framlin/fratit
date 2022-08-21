const PostitController = require('../../use_cases/PostitController');

class interactor_stub{
    execute_called = false;
    execute(){
        this.execute_called = true;
    }
}
let stubbed_interactor;

let postit_controller;

beforeEach(() => {
    stubbed_interactor = new interactor_stub();
    postit_controller = new PostitController(stubbed_interactor);
});

it('can be crated and is type PostitController', () => {
    expect(postit_controller).toBeInstanceOf(PostitController);
});

it('runs execute on the interactor, if run_use_case is called', () => {
    postit_controller.run_use_case();
    expect(stubbed_interactor.execute_called).toBe(true);
})