class UseCaseStub {
    name = "";
    presenter = null;
    constructor(presenter, name) {
        this.name = name;
        this.presenter = presenter;
    }
}

module.exports = UseCaseStub;