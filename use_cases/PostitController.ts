type TODO = any;

export class PostitController{
    _interactor: TODO = null;
    constructor(interactor: TODO) {
        this._interactor = interactor;
    }

    run_use_case() {
        this._interactor.execute();
    }

}

module.exports = {PostitController};