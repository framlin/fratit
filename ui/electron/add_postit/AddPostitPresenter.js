const {ipcMain} = require('electron');
const path = require("path");
const PostitPresenter = require("../PostitPresenter");

let use_case;

class AddPostitPresenter extends PostitPresenter{
    constructor(UseCase, ControllerFactory, InteractorFactory, POST_OFFICE) {
        super(UseCase, path.join(__dirname, 'AddPostitPreloader.js'), ControllerFactory, InteractorFactory, POST_OFFICE);
        UseCase.presenter = this;
        use_case = UseCase;
    }

    on_submit(value) {
        this._controller.add_postit(value);
        this._POST_OFFICE.save();
        this.hide();
    }

    //@ResponseBoundary
    display() {
    }
}

ipcMain.on('postit:submitted',(e, value) => {
    e.preventDefault();
    use_case.presenter.on_submit(value)
});


module.exports = AddPostitPresenter;