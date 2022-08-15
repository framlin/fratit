const {BrowserWindow, ipcMain} = require('electron');
const path = require('path');

let tray_window;

class TrayWindow extends BrowserWindow {
    #POST_OFFICE = null;
    constructor(POST_OFFICE) {
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

        this.#POST_OFFICE = POST_OFFICE;

        this.on('closed', () => {
            tray_window = null;
        })

        tray_window = null;
        tray_window = this;
    }

    fetch_postit() {
        let pile = this.#POST_OFFICE.pile;
        let postit = pile ? pile.top : null;
        let text = postit ? postit.text : "empty pile";
        let expiration = postit ? postit.expiration : "never";
        this.webContents.send('postit:fetch', {text, expiration});
    }

    delete_postit() {
        this.#POST_OFFICE.pile.pop();
        this.fetch_postit();
        this.#POST_OFFICE.save();
    }

}

ipcMain.on('postit:delete', (e) => {
    tray_window.delete_postit();
})


ipcMain.on('tray:close',(e)=>{
    tray_window.hide();
});

module.exports = TrayWindow;