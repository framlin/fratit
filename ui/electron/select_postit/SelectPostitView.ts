const {PostitView} = require("../PostitView");
const path = require("path");
const {ipcMain} = require("electron");
type TODO = any;
let use_case: TODO;

export class SelectPostitView extends PostitView{
    constructor(UseCase: TODO, controller: TODO, interactor: TODO, POST_OFFICE: TODO) {
        super(UseCase, path.join(__dirname, 'SelectPostitPreloader.js'), controller, interactor, POST_OFFICE);
        use_case = UseCase;
    }

    display(postits: TODO) {
        if (postits instanceof Array) {
            this.webContents.send('select_postit:display', postits);
        }
    }
}

ipcMain.on('select_postit:select',(e: TODO, index: TODO) => {
    e.preventDefault();
    use_case.presenter.postit_select(index)
});




module.exports = {SelectPostitView};
