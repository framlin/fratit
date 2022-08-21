const Postit = require("../../postit/Postit");

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