class PostitInteractor {
    _use_case = null;
    _POST_OFFICE = null;

    get presenter() {
        return this._use_case.presenter;
    }

    constructor(use_case, POST_OFFICE) {
        this._use_case = use_case;
        this._POST_OFFICE = POST_OFFICE;
    }

    //@RequestBoundary
    execute() {}
}

module.exports = PostitInteractor;