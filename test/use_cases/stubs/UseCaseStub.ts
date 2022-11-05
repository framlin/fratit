type TODO = any;
export class UseCaseStub {
    name = "";
    presenter = null;
    constructor(presenter: TODO, name: TODO) {
        this.name = name;
        this.presenter = presenter;
    }
}

module.exports = {UseCaseStub};