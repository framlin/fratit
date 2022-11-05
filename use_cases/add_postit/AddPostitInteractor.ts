import {PostitInteractor} from "../PostitInteractor";
type TODO = any;
export class AddPostitInteractor extends PostitInteractor{
    constructor(use_case: TODO, POST_OFFICE: TODO) {
        super(use_case, POST_OFFICE);
    }

    //@RequestBoundary
    execute(postit_data: TODO) {
        let pile = this._POST_OFFICE.pile;
        let postit = this._POST_OFFICE.create_postit();
        let date_parts = postit_data.expiration.split('.');

        postit.text = postit_data.text;
        postit.expiration = new Date(+date_parts[2], date_parts[1] - 1, +date_parts[0]);
        pile.push(postit);
        this._POST_OFFICE.save();

        this._use_case.presenter.present(postit_data);
    }
}

module.exports = {AddPostitInteractor};