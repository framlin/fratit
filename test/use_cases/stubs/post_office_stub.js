class post_office_stub {
    save_called = false;
    get_pile_called = false;
    pile_stub = null;

    get pile() {
        this.get_pile_called = true;
        return this.pile_stub;
    }

    save() {
        this.save_called = true;
    }
}

module.exports = post_office_stub;