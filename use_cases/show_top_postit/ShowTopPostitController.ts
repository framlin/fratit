import {PostitController} from "../PostitController";
type TODO = any;
export class ShowTopPostitController extends PostitController {
    postit_delete() {
        this._interactor.delete_postit();
    }
}

module.exports = {ShowTopPostitController};