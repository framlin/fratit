const PostitView = require("../PostitView");
const path = require("path");
const {ipcMain} = require("electron");
let USE_CASE;

class DispatchPileView extends PostitView{
    constructor(use_case, controller, interactor, POST_OFFICE) {
        super(use_case, path.join(__dirname, 'DispatchPilePreloader.js'), controller, interactor, POST_OFFICE);
        USE_CASE = use_case;
    }

    on_close() {
        this.close();
    }
}

ipcMain.on('dispatch_pile:close', () => USE_CASE.view.on_close());

module.exports = DispatchPileView;
