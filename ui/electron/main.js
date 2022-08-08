const {app, BrowserWindow} = require('electron');
const {create_tray_window} = require("./tray/TrayWindow");


app.whenReady().then(() => {
    create_tray_window()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            create_tray_window()
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});