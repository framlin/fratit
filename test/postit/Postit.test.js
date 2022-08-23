const Postit = require("../../postit/Postit");
const Pile = require("../../postit/Pile");

let postit;

beforeEach(() => {
    postit = new Postit();
});

test('creation', () => {
    expect(postit).toBeInstanceOf(Postit);
});

test('that it can created with text and date passed', () => {
    let expires = new Date(2022,7,19);
    let filled_posit = new Postit('hallo', expires);
    expect(filled_posit.text).toBe('hallo');
    expect(filled_posit.expiration).toBe(expires);
});

it('should be possible, to add a text', () => {
    postit.text = 'message';
    expect(postit.text).toBe('message');
});

test('that a de-serialized postit has type postit', () => {
    let json = JSON.stringify(postit);
    let de_serialized = Postit.from_JSON(json);

    expect(de_serialized).toBeInstanceOf(Postit);
    expect(de_serialized.text).toBe("");
});

test('that a de-serialized properties are correct', () => {
    let date = new Date(2022,1,1);
    postit.text = 'text';
    postit.expiration = date;

    let json = JSON.stringify(postit);
    let de_serialized = Postit.from_JSON(json);

    expect(de_serialized.expiration).toStrictEqual(date);
    expect(de_serialized.text).toBe("text");
    expect(de_serialized).toStrictEqual(postit);
});

it('sets the last-update-date, when anything has changed on the postit', () => {
    function check_last_update(fun) {
        let posit = new Postit('hallo', new Date(2022, 7, 19));
        let before = posit.last_update;
        fun(posit);
        let after = posit.last_update;
        expect(before).toBeLessThan(after);
    }

    check_last_update((postit) => {
        postit.text = 'bla';
    })

    check_last_update((postit) => {
        postit.expiration = new Date(2022,7,7);
    })
});

it('does no re-set the last-update to 0, when the postit gets serialized and de-serialized', () => {
    let posit = new Postit('hallo', new Date(2022, 7, 19));
    postit.text = 'bla';
    let before = postit.last_update;
    let json = JSON.stringify(postit);
    let de_serialized = Postit.from_JSON(json);
    let after = de_serialized.last_update;
    expect(before).toBeGreaterThan(0);
    expect(after).toBeGreaterThan(0);
    expect(before).toBe(after);
});