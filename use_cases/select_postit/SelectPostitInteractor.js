const PostitInteractor = require("../PostitInteractor");

class SelectPostitInteractor extends PostitInteractor{
    constructor(presenter, POST_OFFICE) {
        super(presenter, POST_OFFICE);
    }

    execute() {
        //get all postits from pile
        let pile = this._POST_OFFICE.pile;
        let postits = pile.all;

        //convert the postits into al list of postit_data
        let postit_list = [];
        for (let postit of postits) {
            postit_list.push(postit.text);
        }

        //pass the list to the presenter
        this._presenter.display(postit_list);

        //wait until a postit has been selected
    }

    postit_selected(postit_index) {
        //take the selected postit and move it to the top of the pile
        let pile = this._POST_OFFICE.pile;
        let postit = pile.take(postit_index);
        pile.push(postit);

        //tell the presenter, that work is done
        this._presenter.display(postit);

    }

}

module.exports = SelectPostitInteractor;