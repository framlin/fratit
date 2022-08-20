const AddPostitInteractor = require("../../../use_cases/add_postit/AddPostitInteractor");

it('executes by pushing the passed data to the top of the pile', () => {
    let postit_data = {
        text:'text',
        expiration : '1.2.2022'
    };
    let postits = [];
    let post_office = {
        pile: {
            all: postits,
            push: (elem) => {
                postits.push(elem)
            }
        },
        create_postit: () => {return {text:0, expiration:""}}
    };
    let passed_postit = null;
    let display_called = false;
    let presenter = {
        present: (postit) => {
            display_called = true;
            passed_postit = postit;
        }
    }
    let date = new Date(2022, 1, 1);
    let interactor = new AddPostitInteractor({presenter}, post_office);
    interactor.execute(postit_data);

    expect(display_called).toBe(true);
    expect(passed_postit).toStrictEqual({
        "expiration": "1.2.2022",
        "text": "text"
    });
    expect(post_office.pile.all).toStrictEqual([{
        "expiration": date,
        "text": "text"
    }]);
});