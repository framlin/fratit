const POST_OFFICE = require("../../postit/PostOffice");
const Pile = require("../../postit/Pile");
const Postit = require("../../postit/Postit");

test('that it delivers a pile', () => {
    let pile = POST_OFFICE.pile;

    expect(pile).toBeInstanceOf(Pile);
});

it('is possible to set a new pile', () => {
    let pile = "A_FAKE_PILE";
    POST_OFFICE.pile = pile;
    expect(POST_OFFICE.pile).toBe("A_FAKE_PILE");
})

test('that it can create a Postit', () => {
    let postit = POST_OFFICE.create_postit();

    expect(postit).toBeInstanceOf(Postit);
})

test('that it is a kind of singleton', () => {
    const POST_OFFICE_2 = require("../../postit/PostOffice");
    POST_OFFICE_2._id_ = 42;
    expect(POST_OFFICE._id_).toBe(42);
});
