import {PostitPresenter} from "../PostitPresenter";
type TODO = any;
export class AddPostitPresenter extends PostitPresenter{

    constructor(use_case: TODO, view: TODO, controller: TODO) {
        super(use_case, view, controller);
    }

    on_view_ready_to_show() {
        //must not do anything
    }

    on_submit(value: TODO) {
        this._controller.add_postit(value);
    }


    present(postit_data: TODO) {
        //must not do anything
    };

}

module.exports = {AddPostitPresenter};