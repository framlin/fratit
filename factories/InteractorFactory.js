const AddPostitInteractor = require("../use_cases/add_postit/AddPostitInteractor");
const SelectPostitInteractor = require("../use_cases/select_postit/SelectPostitInteractor");
const ShowTopPostitInteractor = require("../use_cases/show_top_postit/ShowTopPostitInteractor");
const DispatchPileInteractor = require("../use_cases/dispatch_pile/DispatchPileInteractor");

const PostitInteractor = {
    add_postit: (use_case) => new AddPostitInteractor(use_case, InteractorFactory.POST_OFFICE),
    select_postit: (use_case) => new SelectPostitInteractor(use_case, InteractorFactory.POST_OFFICE),
    show_top_postit: (use_case) => new ShowTopPostitInteractor(use_case, InteractorFactory.POST_OFFICE),
    dispatch_pile: (use_case) => new DispatchPileInteractor(use_case, InteractorFactory.POST_OFFICE),
}

class InteractorFactory {
    static POST_OFFICE;
    static config(post_office) {
        InteractorFactory.POST_OFFICE = post_office;
    }

    static create(use_case) {
        return PostitInteractor[use_case.name](use_case);
    }
}

module.exports = InteractorFactory;