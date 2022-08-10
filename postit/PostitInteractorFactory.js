const AddPostitInteractor = require("./AddPostitInteractor");

class PostitInteractorFactory{
    static create_add_postit_interactor(response_boundary, POST_OFFICE) {
        return new AddPostitInteractor(response_boundary, POST_OFFICE);
    }
}

module.exports = PostitInteractorFactory;