const PostitInteractor = require("../PostitInteractor");

class SelectPostitInteractor extends PostitInteractor{
    constructor(use_case, POST_OFFICE) {
        super(use_case, POST_OFFICE);
    }

    execute() {
        this._inform_presenter();
    }

    postit_selected(postit_index) {
        let pile = this._POST_OFFICE.pile;
        let postit = pile.take(postit_index);
        pile.push(postit);

        this._inform_presenter();
    }


    _inform_presenter() {
        let postit_list = this._create_postit_list();
        this._use_case.presenter.present(postit_list);
    }


    _create_postit_list() {
        //get all postits from pile
        let pile = this._POST_OFFICE.pile;
        let postits = pile.all;

        //convert the postits into al list of postit_data
        let postit_list = [];
        for (let postit of postits) {
            postit_list.push(postit.text);
        }
        return postit_list;

    }

}

module.exports = SelectPostitInteractor;