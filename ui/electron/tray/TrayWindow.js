const {BrowserWindow, Menu, Tray, app} = require('electron');
const path = require('path');
const create_add_postit_window = require("../add_postit/AddPostitWindow");

let tray_window, tray, trayBounds;

class TrayWindow extends BrowserWindow {
    constructor() {
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
                preload: path.join(__dirname, 'preload.js')
            }
        });
    }

}


function create_tray_window (ControllerFactory, PostitInteractorFactory, POST_OFFICE) {
    tray_window = new TrayWindow();

    tray_window.loadFile('ui/electron/index.html').then(() => {
        tray = new Tray('ui/electron/tray.png');
        trayBounds = tray.getBounds();
        app.dock.hide();

        const tray_menu = create_tray_menu(ControllerFactory,PostitInteractorFactory, POST_OFFICE);
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
                tray_window = new TrayWindow();
                tray_window.loadFile('ui/electron/index.html');
                tray_window.show();
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