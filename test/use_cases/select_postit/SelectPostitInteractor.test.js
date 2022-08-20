const SelectPostitInteractor = require("../../../use_cases/select_postit/SelectPostitInteractor");
it('executes by passing the presenter all postits as a list', () => {
    let present_called = false;
    let passed_list = [];
    let presenter_stub = {
        present: (list) => {
            present_called = true;
            passed_list = list;
        }
    };

    let postits = [
        {text:1}, {text:2}, {text:3}
    ]
    let post_office_stub = {
        pile: {all: postits}
    };
    let interactor = new SelectPostitInteractor({presenter: presenter_stub}, post_office_stub);
    interactor.execute();
    expect(passed_list).toStrictEqual([1,2,3]);
    expect(present_called).toBe(true);
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
    let present_called = false;
    let passed_list = [];
    let take_called = false;
    let interactor = new SelectPostitInteractor({presenter: {
            //presenter
            present: (list) => {
                passed_list = list;
                present_called = true;
            }
        }
    }, {
        pile: new PILE()
    });
    interactor.postit_selected(1);
    expect(take_called).toBe(true);
    expect(passed_list).toStrictEqual([1, 3, 2]);
})