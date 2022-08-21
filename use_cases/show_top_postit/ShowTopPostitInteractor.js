const PostitInteractor = require("../PostitInteractor");

class ShowTopPostitInteractor extends PostitInteractor {
    delete_postit() {
        let pile = this._POST_OFFICE.pile;
        pile.pop();
        this._POST_OFFICE.save();
        this.execute();
    }

    execute() {
        let pile = this._POST_OFFICE.pile;

        let top_postit = pile.top;
        this.presenter.present({text: top_postit.text, expiration:top_postit.expiration.toLocaleString('de-DE').split(',')[0]});
    }
}

module.exports = ShowTopPostitInteractor;