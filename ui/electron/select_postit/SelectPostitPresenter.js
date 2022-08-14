const PostitPresenter = require("../PostitPresenter");
const path = require("path");
const {ipcMain} = require("electron");
let use_case;

class SelectPostitPresenter extends PostitPresenter{
    constructor(UseCase, ControllerFactory, InteractorFactory, POST_OFFICE) {
        super(UseCase, path.join(__dirname, 'SelectPostitPreloader.js'), ControllerFactory, InteractorFactory, POST_OFFICE);
        UseCase.presenter = this;
        use_case = UseCase;
    }

    on_select(index) {
        this._controller.postit_selected(index);
        this._POST_OFFICE.save();
    }

    run_use_case() {
        this._controller.run_use_case();
    }

    //@ResponseBoundary
    display(postits) {
        if (postits instanceof Array) {
            this.webContents.send('postit_list', postits);
        }
    }
}

ipcMain.on('postit:selected',(e, index) => {
    e.preventDefault();
    use_case.presenter.on_select(index)
});




module.exports = SelectPostitPresenter;
