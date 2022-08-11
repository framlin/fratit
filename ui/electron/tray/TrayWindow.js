const {BrowserWindow, Menu, Tray, app, ipcMain} = require('electron');
const path = require('path');
const create_add_postit_window = require("../add_postit/AddPostitWindow");

let tray_window, tray, trayBounds;

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

ipcMain.on('postit:delete', (e, msg) => {
    e.preventDefault();
    tray_window.delete_postit();
})


ipcMain.on('tray:close',(e)=>{
    e.preventDefault();
    tray_window.hide();
});




function create_tray_window (ControllerFactory, PostitInteractorFactory, POST_OFFICE) {
    tray_window = new TrayWindow(POST_OFFICE);
    tray_window.loadFile(path.join(__dirname, 'tray.html')).then(() => {
        tray = new Tray(path.join(__dirname, 'tray.png'));
        trayBounds = tray.getBounds();
        app.dock.hide();

        const tray_menu = create_tray_menu(ControllerFactory, PostitInteractorFactory, POST_OFFICE);
        tray.setToolTip('framlins postit')
        tray.setContextMenu(tray_menu);

        // Open the DevTools.
        // tray_window.webContents.openDevTools()

    });
}


function create_tray_menu(ControllerFactory, PostitInteractorFactory, POST_OFFICE) {
    return Menu.buildFromTemplate([
        {
            label: 'show postit', click: () => {
                tray_window = new TrayWindow(POST_OFFICE);
                tray_window.loadFile(path.join(__dirname, 'tray.html')).then(() => {
                    tray_window.fetch_postit();
                    tray_window.show();
                });
            }
        },
        {
            label: 'add postit', click: () => {
                create_add_postit_window(
                    ControllerFactory.create_add_postit_controller,
                    PostitInteractorFactory.create_add_postit_interactor,
                    POST_OFFICE
                );
            }
        },
    ]);
}

module.exports = {create_tray_window};