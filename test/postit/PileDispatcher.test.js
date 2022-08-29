const PILE_DISPATCHER = require("../../transport/PileDispatcher");
const Pile = require("../../postit/Pile");

test('that it delivers the list of remote-post-offices', () => {
    let remote_piles = PILE_DISPATCHER.remote_piles;
    expect(remote_piles).toBeDefined();
    expect(remote_piles).not.toBeNull();
});

test('setting remote piles', () => {
    PILE_DISPATCHER.remote_piles = [1];
    expect(PILE_DISPATCHER.remote_piles).toStrictEqual([1]);
});

test('receiving remote piles', () => {
    let remote_pile = PILE_DISPATCHER.receive('remote_address');
        expect(remote_pile).toBeInstanceOf(Pile);
})

test.skip('sending a pile', () => {
    PILE_DISPATCHER.send({});

})