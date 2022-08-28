const PostitInteractor = require("../PostitInteractor");
class DispatchPileInteractor extends PostitInteractor{

    execute() {
        //get remote-post-office-list
        let remote_post_office_list = this._POST_OFFICE.remote_post_offices;
        //prepare remote-office-structure ????
        //call presenter.present -> pass remote-office-structure
        this.presenter.present(remote_post_office_list);
    }

    remote_post_office_selected(remote_post_office) {
        this.sync_with_remote_post_office(remote_post_office);
    }

    sync_with_remote_post_office(remote_post_office) {
        //fetch the remote-pile
        //sync local pile with remote pile -> synced-pile
        //pass synced-pile to local post-office
        //post synced-pile to remote post-office
        //call presenter to present success
    }

}

module.exports = DispatchPileInteractor;