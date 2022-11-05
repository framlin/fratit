import {AddPostitController} from "../use_cases/add_postit/AddPostitController";
import {SelectPostitController} from "../use_cases/select_postit/SelectPostitController";
import {ShowTopPostitController} from "../use_cases/show_top_postit/ShowTopPostitController";
import {DispatchPileController} from "../use_cases/dispatch_pile/DispatchPileController";
type TODO = any;
const PostitController = {
    add_postit: (interactor: TODO) => new AddPostitController(interactor),
    select_postit: (interactor: TODO) => new SelectPostitController(interactor),
    show_top_postit: (interactor: TODO) => new ShowTopPostitController(interactor),
    dispatch_pile: (interactor: TODO) => new DispatchPileController(interactor),
}

export class ControllerFactory {
    static create(controller: TODO, interactor: TODO) {
        // @ts-ignore
        return PostitController[controller](interactor);
    }
}

module.exports = {ControllerFactory};