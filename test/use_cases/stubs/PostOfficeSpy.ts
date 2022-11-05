type TODO = any;
export class PostOfficeSpy {
    save_called = false;
    get_pile_called = false;
    set_pile_called = false;
    pile_stub = null;

    get pile() {
        this.get_pile_called = true;
        return this.pile_stub;
    }

    set pile(pile_stub: TODO) {
        this.set_pile_called = true;
        this.pile_stub = pile_stub;
    }

    save() {
        this.save_called = true;
    }
}

module.exports = {PostOfficeSpy};