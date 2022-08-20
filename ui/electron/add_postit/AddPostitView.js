const {ipcMain} = require('electron');
const path = require("path");
const PostitView = require("../PostitView");

let use_case;

class AddPostitView extends PostitView{
    constructor(UseCase, ControllerFactory, InteractorFactory, POST_OFFICE) {
        super(UseCase, path.join(__dirname, 'AddPostitPreloader.js'), ControllerFactory, InteractorFactory, POST_OFFICE);
        use_case = UseCase;
    }

    //@ResponseBoundary
    display() {
    }
}

ipcMain.on('postit:submitted',(e, value) => {
    e.preventDefault();
    use_case.presenter.on_submit(value)
    use_case.view.hide();
});


module.exports = AddPostitView;