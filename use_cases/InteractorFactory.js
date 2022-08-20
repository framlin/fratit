const AddPostitInteractor = require("./add_postit/AddPostitInteractor");
const SelectPostitInteractor = require("./select_postit/SelectPostitInteractor");

const PostitInteractor = {
    add_postit: (use_case) => new AddPostitInteractor(use_case, InteractorFactory.POST_OFFICE),
    select_postit: (use_case) => new SelectPostitInteractor(use_case, InteractorFactory.POST_OFFICE),
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