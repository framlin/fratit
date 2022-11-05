import {AddPostitInteractor} from "../use_cases/add_postit/AddPostitInteractor";
import {SelectPostitInteractor} from "../use_cases/select_postit/SelectPostitInteractor";
import {ShowTopPostitInteractor} from "../use_cases/show_top_postit/ShowTopPostitInteractor";
import {DispatchPileInteractor} from "../use_cases/dispatch_pile/DispatchPileInteractor";
type TODO = any;
const PostitInteractor = {
    add_postit: (use_case: TODO) => new AddPostitInteractor(use_case, InteractorFactory.POST_OFFICE),
    select_postit: (use_case: TODO) => new SelectPostitInteractor(use_case, InteractorFactory.POST_OFFICE),
    show_top_postit: (use_case: TODO) => new ShowTopPostitInteractor(use_case, InteractorFactory.POST_OFFICE),
    dispatch_pile: (use_case: TODO) => new DispatchPileInteractor(use_case, InteractorFactory.POST_OFFICE, InteractorFactory.PILE_DISPATCHER, InteractorFactory.PILE_SYNCER),
}

export class InteractorFactory {
    static POST_OFFICE: TODO;
    static PILE_DISPATCHER: TODO;
    static PILE_SYNCER: TODO;
    static config(post_office: TODO, pile_dispatcher: TODO, pile_syncer: TODO) {
        InteractorFactory.POST_OFFICE = post_office;
        InteractorFactory.PILE_DISPATCHER = pile_dispatcher;
        InteractorFactory.PILE_SYNCER = pile_syncer;
    }

    static create(use_case: TODO) {
        // @ts-ignore
        return PostitInteractor[use_case.name](use_case);
    }
}

module.exports = {InteractorFactory};