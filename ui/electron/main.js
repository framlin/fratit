const {app, BrowserWindow} = require('electron');

const POST_OFFICE = require("../../postit/PostOffice");
const PILE_STORAGE = require("../../storage/PileStorage");
const PILE_DISPATCHER = require("../../transport/PileDispatcher");


POST_OFFICE.storage = PILE_STORAGE;

const InteractorFactory = require("../../factories/InteractorFactory");
const ControllerFactory = require("../../factories/ControllerFactory");
const ViewFactory = require("../../factories/ViewFactory");
const UseCaseFactory = require("../../factories/UseCaseFactory");
const path = require("path");
const {readFile, writeFile} = require("fs/promises");
const PresenterFactory = require("../../factories/PresenterFactory");
const PILE_SYNCER = require("../../postit/PileSyncer");


const CONFIG_FILE_NAME = path.join(app.getPath("userData"), 'config.json');
let FRATIT_CONFIG;

async function  load_config() {
    const config_file = await readFile(CONFIG_FILE_NAME, 'utf8');

    FRATIT_CONFIG = JSON.parse(config_file);

    if (!FRATIT_CONFIG.pile_storage) {
        FRATIT_CONFIG.pile_storage = "piles";
    }

    let storage_dir = FRATIT_CONFIG.pile_storage;
    let storage_path = path.join(app.getPath("userData"), storage_dir);

    PILE_STORAGE.config(storage_path);
    PILE_STORAGE.load().then();
}

async function  save_config(config) {
    let serialized_config = JSON.stringify(config);
    await writeFile(CONFIG_FILE_NAME, serialized_config);
}

load_config().then(() => {
}).catch(() => {
    FRATIT_CONFIG = {
        pile_storage: "piles",
    }
});

ViewFactory.config(POST_OFFICE);
InteractorFactory.config(POST_OFFICE, PILE_DISPATCHER, PILE_SYNCER);
UseCaseFactory.config(ViewFactory, PresenterFactory, ControllerFactory, InteractorFactory, POST_OFFICE);

app.whenReady().then(() => {
    ViewFactory.create('tray')(UseCaseFactory);
    UseCaseFactory.create('flash_postit');

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            ViewFactory.create('tray')(UseCaseFactory);
        }
    });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    save_config(FRATIT_CONFIG).then();
});

//================================    TEST     ==================================
const METHODS = {
    isReady () {
        // do any setup needed
        return true
    },
    // define your RPC-able methods here
    a_test () {
        return 42;
    }
}

const onMessage = async ({ msgId, cmd, args }) => {
    let method = METHODS[cmd]
    if (!method) method = () => new Error('Invalid method: ' + cmd)
    try {
        const resolve = await method(...args)
        process.send({ msgId, resolve })
    } catch (err) {
        const reject = {
            message: err.message,
            stack: err.stack,
            name: err.name
        }
        process.send({ msgId, reject })
    }
}

if (process.env.APP_TEST_DRIVER) {
    process.on('message', onMessage)
}