const PostitInteractor = require("../PostitInteractor");

class AddPostitInteractor extends PostitInteractor{
    constructor(presenter, POST_OFFICE) {
        super(presenter, POST_OFFICE);
    }

    //@RequestBoundary
    execute(postit_data) {
        let pile = this._POST_OFFICE.pile;
        let postit = this._POST_OFFICE.create_postit();
        let date_parts = postit_data.expiration.split('.');

        postit.text = postit_data.text;
        postit.expiration = new Date(+date_parts[2], date_parts[1] - 1, +date_parts[0]);
        pile.push(postit);

        this._presenter.display(postit_data);
    }
}

module.exports = AddPostitInteractor;