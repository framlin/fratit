const Pile = require("../../postit/Pile");
const Postit = require("../../postit/Postit");
let pile;

function push_two_items(pile) {
    pile.push({value:'One'});
    pile.push({value: 'Two'});
}

function create_123_pile() {
    let new_pile =  new Pile([1,2,3]);
    new_pile.storage = {save: () => {}, load: ()=> {}};
    return new_pile;
}

beforeEach(() => {
    pile = new Pile();
    pile.storage = {save: () => {}, load: ()=> {}};
});

test('creation', () => {
    expect(pile).toBeInstanceOf(Pile);
});

test('that a new Pile has no items', () => {
    expect(pile.size).toBe(0);
});

it('should have 1 item after one push', () => {
    pile.push({});
    expect(pile.size).toBe(1);
});

it('should have 2 item after pushing twice', () => {
    push_two_items(pile);
    expect(pile.size).toBe(2);
});

it('should be possible, to empty a pile', () => {
    push_two_items(pile);
    pile.clear();
    expect(pile.size).toBe(0);
});

test('that top shows the last item recently pushed', () => {
    push_two_items(pile);
    let item = pile.top;
    expect(item).toStrictEqual({value: 'Two'});
});

test('that pop removes one item from the pile', () => {
    push_two_items(pile);
    pile.pop();
    expect(pile.size).toBe(1);
});

test('that pop returns the item on top of the pile', () => {
    push_two_items(pile);
    let item = pile.pop();
    expect(item).toStrictEqual({value: 'Two'});
});

it('can be initialized with an array', () => {
    let pile = create_123_pile();
    expect(pile.size).toBe(3);
    expect(pile.top).toBe(3);
});

test('to return all items at once', () => {
    let items = [1, 2, 3];
    let pile = new Pile(items);
    expect(pile.all).toStrictEqual(items);
});

test('that the pile is incremented if one puts one item into it', () => {
    let pile = create_123_pile();
    pile.put(1,4);
    expect(pile.size).toBe(4);
});

test ('that the element occurs at the index pf all items, at which it was put to', () => {
    let pile = create_123_pile();
    pile.put(1,4);
    expect(pile.all[1]).toBe(4);
});

test('that the pile is decremented if one takes one item out of it', () => {
    let pile = create_123_pile();
    pile.take(1);
    expect(pile.size).toBe(2);
});

test("that at the position an item has been taken from, is the scceeding item now", () => {
    let pile = create_123_pile();
    pile.take(1);
    expect(pile.all[1]).toBe(3);
});

test('that one gets the item, it is taking', () => {
    let pile = create_123_pile();
    let item = pile.take(1);
    expect(item).toBe(2);
})

test('that a de-serialized pile has type Pile', () => {
    let json = JSON.stringify(pile);
    let de_serialized = Pile.from_JSON(json);

    expect(de_serialized).toBeInstanceOf(Pile);
});


test('that a de-serialized properties are correct', () => {
    let postit = new Postit();
    postit.text = "TEXT"
    let items = [postit]
    let pile = new Pile(items);
    let json = JSON.stringify(pile);
    let de_serialized = Pile.from_JSON(json);

    expect(de_serialized).toStrictEqual(pile);
    expect(de_serialized.all).toStrictEqual(pile.all);
});

