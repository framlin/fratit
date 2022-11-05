import {DispatchPileInteractor} from "../../../use_cases/dispatch_pile/DispatchPileInteractor";
import {PostOfficeSpy} from "../stubs/PostOfficeSpy";
import {PresenterSpy} from "../stubs/PresenterSpy";
import {UseCaseStub} from "../stubs/UseCaseStub";

type TODO = any;

class DispatchPilePresenterSpy extends PresenterSpy {
    present_success_called = false;
    present_success() {
        this.present_success_called = true;
    }
}
let presenter_spy = new DispatchPilePresenterSpy()
let use_case_stub = new UseCaseStub(presenter_spy, 'dispatch_pile');

class PileSpy {
    get all() {
        return [];
    }
}


class PileDispatcherSpy {
    _remote_piles = [];
    remote_piles_called = false;
    receive_called = false;
    send_called = false;
    receive_address = '';
    sent_address = ''
    sent_pile = null;

    constructor(remote_piles: TODO) {
        this._remote_piles = remote_piles;
    }

    get remote_piles() {
        this.remote_piles_called = true;
        return this._remote_piles;
    }

    fetch(remote_address: TODO) {
        this.receive_called = true;
        this.receive_address = remote_address;
        return new PileSpy();
    }
    send(remote_pile: TODO, remote_address: TODO) {
        this.send_called = true;
        this.sent_pile = remote_pile;
        this.sent_address = remote_address;
    }
}

class PileSyncerSpy {
    sync_called = false;
    sync(pile_1: TODO, pile_2: TODO) {
        this.sync_called = true;
    }
}


let interactor;

describe('remote post-offices-list', () => {
    it('fetches the list of the remote post-offices from the local post-office and ', () => {
        const remote_p_o_list = [
            {ip: 1, name: 'Office 1'},
            {ip: 2, name: 'Office 2'},
            {ip: 3, name: 'Office 3'}
        ];
        let pile_dispatcher_spy = new PileDispatcherSpy(remote_p_o_list)
        let post_office_spy = new PostOfficeSpy();

        // @ts-ignore
        interactor = new DispatchPileInteractor(use_case_stub, post_office_spy, pile_dispatcher_spy);

        interactor.execute();

        expect_get_list_from_pile_dispatcher();
        expect_pass_list_to_the_presenter();

        function expect_get_list_from_pile_dispatcher() {
            expect(pile_dispatcher_spy.remote_piles_called).toBe(true);
        }
        function expect_pass_list_to_the_presenter() {
            expect(presenter_spy.present_called).toBe(true);

            // @ts-ignore
            expect(presenter_spy.passed_value.length).toBe(3);
            expect(presenter_spy.passed_value).toStrictEqual(remote_p_o_list);
        }

    });
});

test('remote_pile_selected calls pile_dispatcher.receive in a second step', () => {
    let pile_dispatcher_spy = new PileDispatcherSpy([])
    let post_office_spy = new PostOfficeSpy();
    let pile_syncer_spy = new PileSyncerSpy();
    interactor = new DispatchPileInteractor(use_case_stub, post_office_spy, pile_dispatcher_spy, pile_syncer_spy);
    interactor.remote_pile_selected('');

    expect(pile_dispatcher_spy.receive_called).toBe(true);
});

test('sync_with_remote_pile', async () => {
    let pile_dispatcher_spy = new PileDispatcherSpy([]);
    let pile_syncer_spy = new PileSyncerSpy();
    let post_office_spy = new PostOfficeSpy();
    interactor = new DispatchPileInteractor(use_case_stub, post_office_spy, pile_dispatcher_spy, pile_syncer_spy);
    await interactor.remote_pile_selected('');
    expect(pile_dispatcher_spy.receive_called).toBe(true);
    expect(pile_syncer_spy.sync_called).toBe(true);
    expect(post_office_spy.set_pile_called).toBe(true);
    expect(pile_dispatcher_spy.send_called).toBe(true);
    expect(post_office_spy.save_called).toBe(true);
    // @ts-ignore
    expect(use_case_stub.presenter.present_success_called).toBe(true);
});
