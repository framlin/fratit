const Postit = require("../../postit/Postit");

let postit;

beforeEach(() => {
    postit = new Postit();
});

test('creation', () => {
    expect(postit).toBeInstanceOf(Postit);
});

it('should be possible, to add a text', () => {
    postit.text = 'message';
    expect(postit.text).toBe('message');
});

