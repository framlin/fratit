type TODO = any;
export class PostitPresenter {

    _use_case: TODO = null;
    _controller: TODO = null;
    _view: TODO = null;

    constructor(use_case: TODO, view: TODO, controller: TODO) {
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
    present(postit_data: TODO) {
        this._view.display(postit_data);
    };


}

module.exports = {PostitPresenter};