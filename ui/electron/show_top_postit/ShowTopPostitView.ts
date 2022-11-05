import {PostitView} from "../PostitView";
const path = require("path");
const {ipcMain} = require("electron");

type TODO = any;
let USE_CASE: TODO;

export class ShowTopPostitView extends PostitView {
    constructor(use_case: TODO, controller: TODO, interactor: TODO, POST_OFFICE: TODO) {
        super(use_case, path.join(__dirname, 'ShowTopPostitPreloader.js'), controller, interactor, POST_OFFICE);
        USE_CASE = use_case;
    }

    display(postit: TODO) {
        this.webContents.send('show_top_postit:display', postit);
    }
    on_close() {
        this.close();
    }
}

ipcMain.on('show_top_postit:delete', () => USE_CASE.presenter.postit_delete());
ipcMain.on('show_top_postit:close', () => USE_CASE.view.on_close());

module.exports = {ShowTopPostitView};

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