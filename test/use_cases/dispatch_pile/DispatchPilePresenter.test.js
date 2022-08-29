const DispatchPilePresenter = require("../../../use_cases/dispatch_pile/DispatchPilePresenter");
const UseCaseStub = require("../stubs/UseCaseStub");
const ViewSpy = require("../stubs/ViewSpy");
const ControllerSpy = require("../stubs/ControllerSpy");
const PostOfficeSpy = require("../stubs/PostOfficeSpy");



let use_case_stub = new UseCaseStub();
let view_spy = new ViewSpy();
let controller_spy = new ControllerSpy();

let presenter;

beforeEach(() => {
    presenter = new DispatchPilePresenter(use_case_stub, view_spy, controller_spy)
});

test('creation', () => {
    expect(presenter).toBeInstanceOf(DispatchPilePresenter);
});

test('present', () => {
    let remote_post_offices = [{ip:'1', name:'1'}];

    presenter.present(remote_post_offices);

    expect_view_display_called_with_remote_POs();

    function expect_view_display_called_with_remote_POs() {
        expect(view_spy.display_called).toBe(true);
        expect(view_spy.passed_display_value).toStrictEqual(remote_post_offices);
    }
});


