const {PostitView} = require("../PostitView");
const path = require("path");
const {ipcMain} = require("electron");

type TODO = any;
let USE_CASE: TODO;

export class DispatchPileView extends PostitView{
    constructor(use_case: TODO, controller: TODO, interactor: TODO, POST_OFFICE: TODO) {
        super(use_case, path.join(__dirname, 'DispatchPilePreloader.js'), controller, interactor, POST_OFFICE);
        USE_CASE = use_case;
    }

    dispatch_succeeded(remote_pile_address: TODO) {
        this.webContents.send('dispatch_pile:succeeded',remote_pile_address );
    }

    display(remote_piles: TODO) {
        this.webContents.send('dispatch_pile:display', remote_piles);
    }

    on_close() {
        this.close();
    }
}

ipcMain.on('dispatch_pile:close', () => USE_CASE.view.on_close());
ipcMain.on('dispatch_pile:submit', (e: TODO, remote_pile_address: TODO) => USE_CASE.presenter.submit(remote_pile_address));

module.exports = {DispatchPileView};
