const {BrowserWindow, ipcMain} = require('electron');
const path = require("path");

let add_postit_window;

class AddPostitWindow extends BrowserWindow {
    #controller = null;
    #request_boundary = null;
    #POST_OFFICE = null;

    constructor(ControllerFactory, InteractorFactory, POST_OFFICE) {
        super({
            width: 200,
            height: 200,
            alwaysOnTop: true,
            webPreferences: {
                preload: path.join(__dirname, 'AddPostitPreloader.js')
            }
        });

        this.#request_boundary = InteractorFactory.create("add_postit", this);
        this.#controller = ControllerFactory.create("add_postit", this.#request_boundary);
        this.#POST_OFFICE = POST_OFFICE;

        this.on('closed', () => {
            add_postit_window = null;
        })

        add_postit_window = this;

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
});


module.exports = AddPostitWindow;