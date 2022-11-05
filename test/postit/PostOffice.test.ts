import {POST_OFFICE} from "../../postit/PostOffice";
import {Pile} from "../../postit/Pile";
import {Postit} from "../../postit/Postit";

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

import {POST_OFFICE as  POST_OFFICE_2} from "../../postit/PostOffice";

test('that it is a kind of singleton', () => {
    POST_OFFICE_2._id_ = 42;
    expect(POST_OFFICE._id_).toBe(42);
});
