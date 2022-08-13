class PostitInteractor {
    _presenter = null;
    _POST_OFFICE = null;

    constructor(presenter, POST_OFFICE) {
        this._presenter = presenter;
        this._POST_OFFICE = POST_OFFICE;
    }

    //@RequestBoundary
    execute() {
    }
}

module.exports = PostitInteractor;