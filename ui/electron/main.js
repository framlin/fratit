const {app, BrowserWindow, Menu, Tray} = require('electron');
const path = require('path');

let mainWindow, tray,  trayBounds;

const createWindow = async () => {
    mainWindow = new BrowserWindow({
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
        },
        show: false,
    });

    await mainWindow.loadFile('ui/electron/index.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

}

function toggleWindow() {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
}

app.whenReady().then(() => {
    createWindow().then(() => {
        tray = new Tray('ui/electron/tray.png');
        trayBounds = tray.getBounds();
        app.dock.hide();

        const contextMenu = Menu.buildFromTemplate([
            { label: 'add postit', click: () => {
                console.log("add postit")
                }},
        ]);
        tray.setToolTip('FROTIT')
        tray.setContextMenu(contextMenu)

        tray.on('click', () => {
            mainWindow.setPosition(trayBounds.y -300, trayBounds.x);
            toggleWindow();
         });

    });


    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});