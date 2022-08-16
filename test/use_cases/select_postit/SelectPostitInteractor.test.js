const SelectPostitInteractor = require("../../../use_cases/select_postit/SelectPostitInteractor");
it('executes by passing the presenter all postits as a list', () => {
    let display_called = false;
    let passed_list = [];
    let presenter_stub = {
        display: (list) => {
            display_called = true;
            passed_list = list;
        }
    };

    let postits = [
        {text:1}, {text:2}, {text:3}
    ]
    let post_office_stub = {
        pile: {all: postits}
    };
    let interactor = new SelectPostitInteractor(presenter_stub, post_office_stub);
    interactor.execute();
    expect(passed_list).toStrictEqual([1,2,3]);
    expect(display_called).toBe(true);
});


it('reacts to postit_selected, by moving the selected postit to the top', () => {
    let postits = [{text:1}, {text:2}, {text:3}]
    let small_postits = [{text:1}, {text:3}]
    class PILE{
        get all() {
            return postits;
        }
        take(index) {
            postits = small_postits;
            take_called = true;
            return {text:2};
        }

        push(elem){
            postits.push(elem);
        }
    }
    let display_called = false;
    let displayed_list = [];
    let take_called = false;
    let interactor = new SelectPostitInteractor({
        //presenter
        display: (list) => {
            displayed_list = list;
            display_called = true;
        }
    }, {
        pile: new PILE()
    });
    interactor.postit_selected(1);
    expect(take_called).toBe(true);
    expect(displayed_list).toStrictEqual([1, 3, 2]);
})