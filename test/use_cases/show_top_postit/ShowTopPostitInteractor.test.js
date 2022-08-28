const ShowTopPostitInteractor = require("../../../use_cases/show_top_postit/ShowTopPostitInteractor");
const Postit = require("../../../postit/Postit");
const post_office_stub = require("../stubs/PostOfficeSpy");
const presenter_stub = require("../stubs/PresenterSpy");



class pile_stub {
    top_is_called = false;
    pop_is_called = false;
    postit_count = 1;

    get top() {
        this.top_is_called = true;
        return new Postit('hallo', new Date(2022, 7, 19));
    }

    pop() {
        this.pop_is_called = true;
        this.postit_count--;
        return new Postit('hallo', new Date(2022, 7, 19));
    }

}

let stubbed_pile;
let stubbed_presenter;
let stubbed_post_office;
let show_top_postit_interactor;


beforeEach(() => {
    stubbed_pile = new pile_stub();
    stubbed_post_office = new post_office_stub();
    stubbed_post_office.pile_stub = stubbed_pile;
    stubbed_presenter = new presenter_stub();
    let use_case_stub = {
        name: 'show_top_postit',
        presenter: stubbed_presenter,
    }

    show_top_postit_interactor = new ShowTopPostitInteractor(use_case_stub, stubbed_post_office);
});

it('fetches the top-postit and pass its values the presenter if execute is called', () => {
    show_top_postit_interactor.execute();
    expect(stubbed_post_office.get_pile_called).toBe(true);
    expect_present_called();
});

function expect_present_called() {
    expect(stubbed_pile.top_is_called).toBe(true);
    expect(stubbed_presenter.present_called).toBe(true);
    expect(stubbed_presenter.passed_value).toStrictEqual({
        text: 'hallo',
        expiration: "19.8.2022"
    });
}

it('pops the top-postit from the pile, if delete_postit ist called and calls the presenter with the new top postit',
    () => {
        show_top_postit_interactor.delete_postit();
        expect(stubbed_pile.pop_is_called).toBe(true);
        expect_present_called();

    });

it('removes one postit from the pile and calls save on the post-office, if delete_postit is called', () => {
    let postit_count = stubbed_pile.postit_count;
    show_top_postit_interactor.delete_postit();
    expect(stubbed_pile.postit_count).toBe(postit_count-1);
    expect(stubbed_post_office.save_called).toBe(true);
})