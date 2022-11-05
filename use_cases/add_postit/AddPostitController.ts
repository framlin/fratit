import {PostitController} from "../PostitController";
type TODO = any;

export class AddPostitController extends PostitController{
    constructor(interactor: TODO) {
        super(interactor)
    }

    add_postit(postit_data: TODO) {
        this._interactor.execute(postit_data);
    }

}

module.exports = {AddPostitController};