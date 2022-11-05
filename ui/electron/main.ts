type TODO = any
const {app, BrowserWindow} = require('electron');
const path = require("path");
const {readFile, writeFile} = require("fs/promises");

import {POST_OFFICE} from "../../postit/PostOffice";
import {PILE_STORAGE} from "../../storage/PileStorage";
import {PILE_DISPATCHER} from "../../transport/PileDispatcher";
import {REMOTE_PILES_STORAGE} from "../../storage/RemotePilesStorage";


import {RECEIVER} from "../../transport/Receiver";

RECEIVER.config(PILE_DISPATCHER);
RECEIVER.start();

import {SENDER} from "../../transport/Sender";
PILE_DISPATCHER.sender = SENDER;
PILE_DISPATCHER.post_office = POST_OFFICE;

POST_OFFICE.storage = PILE_STORAGE;


import {InteractorFactory} from "../../factories/InteractorFactory";
import {ControllerFactory} from "../../factories/ControllerFactory";
import {ViewFactory} from "../../factories/ViewFactory";
import {UseCaseFactory} from "../../factories/UseCaseFactory";
import {PresenterFactory} from "../../factories/PresenterFactory";
import {PILE_SYNCER} from "../../postit/PileSyncer";


const CONFIG_FILE_NAME = path.join(app.getPath("userData"), 'config.json');
let FRATIT_CONFIG: TODO;

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

    REMOTE_PILES_STORAGE.config(storage_path);
    REMOTE_PILES_STORAGE.load().then(() => {
        PILE_DISPATCHER.remote_piles = REMOTE_PILES_STORAGE.remote_piles;
    });

}

async function  save_config(config: TODO) {
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
    // if (process.platform !== 'darwin') {
    //     app.quit();
    // }
});

app.on('before-quit', () => {
    save_config(FRATIT_CONFIG).then();
    REMOTE_PILES_STORAGE.save().then();
    PILE_STORAGE.save().then();
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

// @ts-ignore
const onMessage = async ({ msgId, cmd, args }) => {
    // @ts-ignore
    let method = METHODS[cmd]
    if (!method) method = () => new Error('Invalid method: ' + cmd)
    try {
        const resolve = await method(...args)
        // @ts-ignore
        process.send({ msgId, resolve })
    } catch (err: TODO) {
        const reject = {
            message: err.message,
            stack: err.stack,
            name: err.name
        }
        // @ts-ignore
        process.send({ msgId, reject })
    }
}

if (process.env.APP_TEST_DRIVER) {
    process.on('message', onMessage)
}