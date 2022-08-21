const PostitView = require("../PostitView");
const path = require("path");
const {ipcMain} = require("electron");
let USE_CASE;

class ShowTopPostitView extends PostitView{
    constructor(use_case, controller, interactor, POST_OFFICE) {
        super(use_case, path.join(__dirname, 'ShowTopPostitPreloader.js'), controller, interactor, POST_OFFICE);
        USE_CASE = use_case;
    }

    display(postit) {
        this.webContents.send('show_top_postit:display', postit);
    }
    on_close() {
        this.hide();
    }
}

ipcMain.on('show_top_postit:delete', () => USE_CASE.presenter.postit_delete());
ipcMain.on('show_top_postit:close', () => USE_CASE.view.on_close());

module.exports = ShowTopPostitView;

/*  what I have found for Tray-Windows
        super({
            width: 200,
            height: 200,
            frame: false,
            resizable: false,
            transparent: true,
            show: false,
            movable: false,
            minimizable: false,
            alwaysOnTop: true,
            skipTaskbar: true,
            maximizable: false,
            webPreferences: {
                preload: path.join(__dirname, 'TrayPreloader.js')
            }
        });
 */