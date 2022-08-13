const {app, BrowserWindow} = require('electron');

const POST_OFFICE = require("../../postit/PostOffice");
const PILE_STORAGE = require("../../storage/PileStorage");
POST_OFFICE.storage = PILE_STORAGE;

const InteractorFactory = require("../../use_cases/InteractorFactory");
const ControllerFactory = require("./ControllerFactory");
const WindowFactory = require("./WindowFactory");
const UseCaseFactory = require("../../use_cases/UseCaseFactory");


WindowFactory.config(ControllerFactory, InteractorFactory, POST_OFFICE);
InteractorFactory.config(POST_OFFICE);
UseCaseFactory.config(WindowFactory);

app.whenReady().then(() => {
    WindowFactory.create('tray')(UseCaseFactory);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            WindowFactory.create('tray')(UseCaseFactory);
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});