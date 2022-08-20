const PostitView = require("../PostitView");
const path = require("path");
const {ipcMain} = require("electron");
let use_case;

class SelectPostitView extends PostitView{
    constructor(UseCase, ControllerFactory, InteractorFactory, POST_OFFICE) {
        super(UseCase, path.join(__dirname, 'SelectPostitPreloader.js'), ControllerFactory, InteractorFactory, POST_OFFICE);
        use_case = UseCase;
    }

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




module.exports = SelectPostitView;
