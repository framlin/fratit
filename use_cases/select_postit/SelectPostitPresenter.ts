import {PostitPresenter} from "../PostitPresenter";
type TODO = any;
export class SelectPostitPresenter extends PostitPresenter{
    constructor(use_case: TODO, view: TODO, controller: TODO) {
        super(use_case, view, controller);
    }

    postit_select(index: TODO) {
        this._controller.postit_select(index);
    }

    //@ResponseBoundary
    present(postits: TODO) {
        if (postits instanceof Array) {
            this._view.display(postits);
        }
    }
}

module.exports = {SelectPostitPresenter};