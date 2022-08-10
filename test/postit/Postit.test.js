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

test('that a de-serialized postit has type postit', () => {
    let json = JSON.stringify(postit);
    let de_serialized = Postit.from_JSON(json);

    expect(de_serialized).toBeInstanceOf(Postit);
    expect(de_serialized.text).toBe("");
});

test('that a de-serialized properties are correct', () => {
    postit.text = 'text';
    postit.expiration = '01.01.2023';

    let json = JSON.stringify(postit);
    let de_serialized = Postit.from_JSON(json);

    expect(de_serialized.expiration).toBe('01.01.2023');
    expect(de_serialized.text).toBe("text");
    expect(de_serialized).toStrictEqual(postit);
});