const {app, BrowserWindow} = require('electron');

const POST_OFFICE = require("../../postit/PostOffice");
const PILE_STORAGE = require("../../storage/PileStorage");
POST_OFFICE.storage = PILE_STORAGE;

const InteractorFactory = require("../../use_cases/InteractorFactory");
const ControllerFactory = require("../../use_cases/ControllerFactory");
const PresenterFactory = require("./PresenterFactory");
const UseCaseFactory = require("../../use_cases/UseCaseFactory");


PresenterFactory.config(ControllerFactory, InteractorFactory, POST_OFFICE);
InteractorFactory.config(POST_OFFICE);
UseCaseFactory.config(PresenterFactory);

app.whenReady().then(() => {
    PresenterFactory.create('tray')(UseCaseFactory);
    UseCaseFactory.create('flash_postit');

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            PresenterFactory.create('tray')(UseCaseFactory);
        }
    });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});