import {PILE_DISPATCHER} from "../../transport/PileDispatcher";
import {Pile} from "../../postit/Pile";

test('setting remote piles', () => {
    PILE_DISPATCHER.remote_piles = [1];
    expect(PILE_DISPATCHER.remote_piles).toStrictEqual([1]);
});

class SenderSpy {
    get_pile() {
        return new Pile();
    }
}

test('receiving remote piles', async () => {
    PILE_DISPATCHER.sender = new SenderSpy();
    let remote_pile = await PILE_DISPATCHER.fetch('remote_address');
        expect(remote_pile).toBeInstanceOf(Pile);
});

test.skip('sending a pile', () => {
    // @ts-ignore
    PILE_DISPATCHER.send({});
});