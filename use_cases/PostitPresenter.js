class PostitPresenter {

    _use_case = null;
    _controller = null;
    _POST_OFFICE = null;
    _view = null;

    constructor(use_case, view, controller, post_office) {
        this._use_case = use_case;
        this._view = view;
        this._controller = controller;
        this._POST_OFFICE = post_office;
        this._use_case.presenter = this;
    }
}

module.exports = PostitPresenter;