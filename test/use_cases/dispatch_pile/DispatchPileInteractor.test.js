const DispatchPileInteractor = require("../../../use_cases/dispatch_pile/DispatchPileInteractor");
const PostOfficeSpy = require("../stubs/PostOfficeSpy");
const PresenterSpy = require("../stubs/PresenterSpy");
const UseCaseStub = require("../stubs/UseCaseStub");

class DispatchPilePresenterSpy extends PresenterSpy {}
let presenter_spy = new DispatchPilePresenterSpy()

let use_case_stub = new UseCaseStub(presenter_spy, 'dispatch_pile');

class DispatchPile_PostOfficeStub extends PostOfficeSpy{
    get_remote_post_offices_called = false;
    constructor(remote_post_offices_list) {
        super();
        this.remote_post_offices_list = remote_post_offices_list;
    }
    get remote_post_offices() {
        this.get_remote_post_offices_called = true;
        return this.remote_post_offices_list;
    }
}
let post_office_spy = new DispatchPile_PostOfficeStub();

let interactor;

describe('remote post-offices-list', () => {
    // beforeEach(() => {
    //     interactor = new DispatchPileInteractor(use_case_stub, post_office_spy);
    // })
    it('fetches the list of the remote post-offices from the local post-office and ', () => {
        const remote_p_o_list = [
            {ip:1, name: 'Office 1'},
            {ip:2, name: 'Office 2'},
            {ip:3, name: 'Office 3'}
        ];
        let post_office_spy = new DispatchPile_PostOfficeStub(remote_p_o_list);
        interactor = new DispatchPileInteractor(use_case_stub, post_office_spy);

        interactor.execute();

        expect_get_list_from_post_office();
        expect_pass_list_to_the_presenter();

        function expect_get_list_from_post_office() {
            expect(post_office_spy.get_remote_post_offices_called).toBe(true);
        }
        function expect_pass_list_to_the_presenter() {
            expect(presenter_spy.present_called).toBe(true);
            expect(presenter_spy.passed_value.length).toBe(3);
            expect(presenter_spy.passed_value).toStrictEqual(remote_p_o_list);
        }

    });
})
