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

    on_select(value) {
        this._controller.select_postit(value);
        this._POST_OFFICE.save();
        this.hide();
    }

    //@ResponseBoundary
    display() {
    }
}

ipcMain.on('postit:selected',(e, value) => {
    e.preventDefault();
    use_case.presenter.on_select(value)
});




module.exports = SelectPostitPresenter;
