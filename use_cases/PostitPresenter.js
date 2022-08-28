class PostitPresenter {

    _use_case = null;
    _controller = null;
    _view = null;

    constructor(use_case, view, controller) {
        this._use_case = use_case;
        this._view = view;
        this._controller = controller;
        this._use_case.presenter = this;

        this._view.once('ready-to-show', () => {
            this.on_view_ready_to_show();
        });
    }

    on_view_ready_to_show() {
        this.run_use_case();
    }

    run_use_case() {
        this._controller.run_use_case();
    }

    //@ResponseBoundary
    present(postit_data) {
        this._view.display(postit_data);
    };


}

module.exports = PostitPresenter;