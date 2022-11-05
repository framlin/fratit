import {PostitController} from "../PostitController";
type TODO = any;
export class SelectPostitController extends PostitController {
    constructor(interactor: TODO) {
        super(interactor)
    }

    postit_select(index: TODO) {
        this._interactor.postit_select(index);
    }
}

module.exports = {SelectPostitController};