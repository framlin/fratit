const PostitView = require("../PostitView");
const path = require("path");
const {ipcMain} = require("electron");
let use_case;

class SelectPostitView extends PostitView{
    constructor(UseCase, controller, interactor, POST_OFFICE) {
        super(UseCase, path.join(__dirname, 'SelectPostitPreloader.js'), controller, interactor, POST_OFFICE);
        use_case = UseCase;
    }

    display(postits) {
        if (postits instanceof Array) {
            this.webContents.send('select_postit:display', postits);
        }
    }
}

ipcMain.on('select_postit:select',(e, index) => {
    e.preventDefault();
    use_case.presenter.postit_select(index)
});




module.exports = SelectPostitView;
