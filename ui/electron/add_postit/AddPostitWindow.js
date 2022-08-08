const {BrowserWindow} = require('electron');
const path = require("path");

class AddPostitWindow extends BrowserWindow {
    constructor() {
        super({
            width: 200,
            height: 200,
            webPreferences: {
                preload: path.join(__dirname, 'AddPostitPreloader.js')
            }
        });
    }

}

let add_postit_window;

function create_add_postit_window() {
    add_postit_window = new AddPostitWindow();
    add_postit_window.loadFile('ui/electron/add_postit/add_postit.html');
}


module.exports = create_add_postit_window;