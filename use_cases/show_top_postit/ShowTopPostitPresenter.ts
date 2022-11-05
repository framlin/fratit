import {PostitPresenter} from "../PostitPresenter";

export class ShowTopPostitPresenter extends PostitPresenter {

    postit_delete() {
        this._controller.postit_delete();
    }
}

module.exports = {ShowTopPostitPresenter}