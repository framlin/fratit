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

test('that the postit is the same as itself', () => {
    expect(postit.is_same_as(postit)).toBe(true);
});

test('that one postit is not the same as another postit, that is created a little bit later', async () => {
    let postit_1 = new Postit();
    await new Promise((r) => setTimeout(r, 2));
    let postit_2 = new Postit();
    expect(postit_1.is_same_as(postit_2)).toBe(false);
});

test('that a postit keeps the same after serialization and de-serialization', () => {
    let postit_1 = new Postit();
    let json = JSON.stringify(postit_1);
    let postit_2 = Postit.from_JSON(json);

    expect(postit_1.is_same_as(postit_2)).toBe(true);
});

test('that the expiration of a de-serialized postit without expiration is null', () => {
    let postit_1 = new Postit();
    let json = JSON.stringify(postit_1);
    let postit_2 = Postit.from_JSON(json);

    expect(postit.expiration).toBeNull();

})

it('keeps the same, even if it is serialized and deserialized twice and properties are changed between', () => {
    let postit_1 = new Postit();
    let json_1 = JSON.stringify(postit_1);
    let postit_2 = Postit.from_JSON(json_1);
    postit_2.text = 'different';
    let json_2 = JSON.stringify(postit_2);
    let postit_3 = Postit.from_JSON(json_2);

    expect(postit_1.is_same_as(postit_3)).toBe(true);
});

test('that a postit is equal with itself', () => {
    expect(postit.is_equal_with(postit)).toBe(true);
});

test("that 2 postits aren't equal, if both are 'empty' postits", async () => {
    let postit_1 = new Postit();
    await new Promise((r) => setTimeout(r, 2));
    let postit_2 = new Postit();
    expect(postit_1.is_equal_with(postit_2)).toBe(false);
});

test('that 2 postits are not equal, even if they have the same properties', async () => {
    let date = new Date('2022,1,1');
    let text = "test";
    let postit_1 = new Postit(text, date);
    await new Promise((r) => setTimeout(r, 2));
    let postit_2 = new Postit(text, date);
    expect(postit_1.is_equal_with(postit_2)).toBe(false);
});