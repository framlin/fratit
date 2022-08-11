const {BrowserWindow, ipcMain} = require('electron');
const path = require("path");

let add_postit_window;

class AddPostitWindow extends BrowserWindow {
    #controller = null;
    #request_boundary = null;
    #POST_OFFICE = null;

    constructor(create_controller, create_request_boundary, POST_OFFICE) {
        super({
            width: 200,
            height: 200,
            alwaysOnTop: true,
            webPreferences: {
                preload: path.join(__dirname, 'AddPostitPreloader.js')
            }
        });

        this.#request_boundary = create_request_boundary(this, POST_OFFICE);
        this.#controller = create_controller(this.#request_boundary);
        this.#POST_OFFICE = POST_OFFICE;


        this.on('closed', () => {
            add_postit_window = null;
        })

    }

    on_submit(value) {
        this.#controller.add_postit(value);
        this.#POST_OFFICE.save();
        this.hide();
    }

    //@ResponseBoundary
    display() {
    }
}



ipcMain.on('postit:submitted',(e, value) => {
    e.preventDefault();
    add_postit_window.on_submit(value)
})


function create_add_postit_window(create_controller, create_request_boundary, post_office) {
        add_postit_window = new AddPostitWindow(create_controller, create_request_boundary, post_office);
        add_postit_window.loadFile('ui/electron/add_postit/add_postit.html').then();
        // Open the DevTools.
        // add_postit_window.webContents.openDevTools();
}



module.exports = create_add_postit_window;