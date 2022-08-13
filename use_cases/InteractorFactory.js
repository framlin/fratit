const AddPostitInteractor = require("./add_postit/AddPostitInteractor");
const SelectPostitInteractor = require("./select_postit/SelectPostitInteractor");

const PostitInteractor = {
    add_postit: (presenter) => new AddPostitInteractor(presenter, InteractorFactory.POST_OFFICE),
    select_postit: (presenter) => new SelectPostitInteractor(presenter, InteractorFactory.POST_OFFICE),
}

class InteractorFactory {
    static POST_OFFICE;
    static config(post_office) {
        InteractorFactory.POST_OFFICE = post_office;
    }

    static create(interactor, presenter) {
        return PostitInteractor[interactor](presenter);
    }
}

module.exports = InteractorFactory;