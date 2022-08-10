const {app, BrowserWindow} = require('electron');
const {create_tray_window} = require("./tray/TrayWindow");
const PostitInteractorFactory = require("../../postit/PostitInteractorFactory");
const POST_OFFICE = require("../../postit/PostOffice");
const ControllerFactory = require("./ControllerFactory");


app.whenReady().then(() => {
    create_tray_window(ControllerFactory, PostitInteractorFactory, POST_OFFICE);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            create_tray_window(ControllerFactory, PostitInteractorFactory, POST_OFFICE);
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});