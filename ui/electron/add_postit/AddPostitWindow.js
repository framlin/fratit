const {BrowserWindow, ipcMain} = require('electron');
const path = require("path");

let add_postit_window;

class AddPostitWindow extends BrowserWindow {
    #controller = null;
    #request_boundary = null;

    constructor(create_controller, create_request_boundary, post_office) {
        super({
            width: 200,
            height: 200,
            webPreferences: {
                preload: path.join(__dirname, 'AddPostitPreloader.js')
            }
        });

        this.#request_boundary = create_request_boundary(this, post_office);
        this.#controller = create_controller(this.#request_boundary);

        ipcMain.on('postit:submitted',(e, value)=>{
            this.#controller.add_postit(value);
        })

        this.on('closed', (e) => {
            add_postit_window = null;
        })

    }

    //@ResponseBoundary
    display() {
    }
}

function create_add_postit_window(create_controller, create_request_boundary, post_office) {
        add_postit_window = new AddPostitWindow(create_controller, create_request_boundary, post_office);
        add_postit_window.loadFile('ui/electron/add_postit/add_postit.html');
        // Open the DevTools.
        add_postit_window.webContents.openDevTools();
}



module.exports = create_add_postit_window;