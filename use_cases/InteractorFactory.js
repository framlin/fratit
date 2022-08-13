const AddPostitInteractor = require("./add_postit/AddPostitInteractor");

const PostitInteractor = {
    add_postit: AddPostitInteractor
}

class InteractorFactory {
    static POST_OFFICE;
    static config(post_office) {
        InteractorFactory.POST_OFFICE = post_office;
    }

    static create(interactor, presenter) {
        return new PostitInteractor[interactor](presenter, InteractorFactory.POST_OFFICE);
    }
    // static create_add_postit_interactor(response_boundary, POST_OFFICE) {
    //     return new AddPostitInteractor(response_boundary, POST_OFFICE);
    // }
}

module.exports = InteractorFactory;