const {ipcMain} = require('electron');
const path = require("path");
const {PostitView} = require("../PostitView");
type TODO = any;
let use_case: TODO;

export class AddPostitView extends PostitView{
    constructor(UseCase: TODO, ControllerFactory: TODO, InteractorFactory: TODO, POST_OFFICE: TODO) {
        super(UseCase, path.join(__dirname, 'AddPostitPreloader.js'), ControllerFactory, InteractorFactory, POST_OFFICE);
        use_case = UseCase;
    }

    //@ResponseBoundary
    display() {
    }
}

ipcMain.on('postit:submitted',(e: TODO, value: TODO) => {
    e.preventDefault();
    use_case.presenter.on_submit(value)
    use_case.view.hide();
});


module.exports = {AddPostitView};