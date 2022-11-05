type TODO = any;
export class PostitInteractor {
    _use_case: TODO = null;
    _POST_OFFICE: TODO = null;

    get presenter() {
        return this._use_case.presenter;
    }

    constructor(use_case: TODO, POST_OFFICE: TODO) {
        this._use_case = use_case;
        this._POST_OFFICE = POST_OFFICE;
    }

    //@RequestBoundary
    execute(...data:any[]) {}
}

module.exports = {PostitInteractor};