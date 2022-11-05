import {AddPostitPresenter} from "../use_cases/add_postit/AddPostitPresenter";
import {SelectPostitPresenter} from "../use_cases/select_postit/SelectPostitPresenter";
import {ShowTopPostitPresenter} from "../use_cases/show_top_postit/ShowTopPostitPresenter";
import {DispatchPilePresenter} from "../use_cases/dispatch_pile/DispatchPilePresenter";
type TODO = any;
const PostitPresenters = {
    add_postit: (use_case: TODO, view: TODO, controller: TODO) => {
        return new AddPostitPresenter(use_case, view, controller);
    },
    select_postit: (use_case: TODO, view: TODO, controller: TODO) => {
        return new SelectPostitPresenter(use_case, view, controller);
    },
    show_top_postit: (use_case: TODO, view: TODO, controller: TODO) => {
        return new ShowTopPostitPresenter(use_case, view, controller);
    },
    dispatch_pile: (use_case: TODO, view: TODO, controller: TODO) => {
        return new DispatchPilePresenter(use_case, view, controller);
    },

}

export class PresenterFactory {
    static create(use_case: TODO)  : TODO{
        // @ts-ignore
        return PostitPresenters[use_case];
    }

}

module.exports = {PresenterFactory};