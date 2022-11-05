import {AddPostitInteractor} from "../../../use_cases/add_postit/AddPostitInteractor";
import {PostOfficeSpy} from "../stubs/PostOfficeSpy";

type TODO = any;

it('executes by pushing the passed data to the top of the pile', () => {
    let postit_data = {
        text:'text',
        expiration : '1.2.2022'
    };
    let postits: TODO = [];
    class  post_office extends PostOfficeSpy {
        _pile = {
            all: postits,
            push: (elem: TODO) => {
                postits.push(elem)
            }
        }
        get pile() {
            return this._pile;
        }

        create_postit(){
            return {
                text:0, expiration:""
            }
        }
    }
    let stubbed_post_office = new post_office;
    let passed_postit = null;
    let display_called = false;
    let presenter = {
        present: (postit: TODO) => {
            display_called = true;
            passed_postit = postit;
        }
    }
    let date = new Date(2022, 1, 1);
    let interactor = new AddPostitInteractor({presenter}, stubbed_post_office);
    interactor.execute(postit_data);

    expect(display_called).toBe(true);
    expect(stubbed_post_office.save_called).toBe(true);

    expect(passed_postit).toStrictEqual({
        "expiration": "1.2.2022",
        "text": "text"
    });
    expect(stubbed_post_office.pile.all).toStrictEqual([{
        "expiration": date,
        "text": "text"
    }]);
});