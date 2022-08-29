const AddPostitInteractor = require("../use_cases/add_postit/AddPostitInteractor");
const SelectPostitInteractor = require("../use_cases/select_postit/SelectPostitInteractor");
const ShowTopPostitInteractor = require("../use_cases/show_top_postit/ShowTopPostitInteractor");
const DispatchPileInteractor = require("../use_cases/dispatch_pile/DispatchPileInteractor");

const PostitInteractor = {
    add_postit: (use_case) => new AddPostitInteractor(use_case, InteractorFactory.POST_OFFICE),
    select_postit: (use_case) => new SelectPostitInteractor(use_case, InteractorFactory.POST_OFFICE),
    show_top_postit: (use_case) => new ShowTopPostitInteractor(use_case, InteractorFactory.POST_OFFICE),
    dispatch_pile: (use_case) => new DispatchPileInteractor(use_case, InteractorFactory.POST_OFFICE, InteractorFactory.PILE_DISPATCHER, InteractorFactory.PILE_SYNCER),
}

class InteractorFactory {
    static POST_OFFICE;
    static PILE_DISPATCHER;
    static PILE_SYNCER;
    static config(post_office, pile_dispatcher, pile_syncer) {
        InteractorFactory.POST_OFFICE = post_office;
        InteractorFactory.PILE_DISPATCHER = pile_dispatcher;
        InteractorFactory.PILE_SYNCER = pile_syncer;
    }

    static create(use_case) {
        return PostitInteractor[use_case.name](use_case);
    }
}

module.exports = InteractorFactory;