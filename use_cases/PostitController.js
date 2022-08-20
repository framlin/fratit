class PostitController{
    _interactor = null;
    constructor(interactor) {
        this._interactor = interactor;
    }

    run_use_case() {
        this._interactor.execute();
    }

}

module.exports = PostitController;