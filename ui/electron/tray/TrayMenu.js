const {Menu} = require("electron");
const path = require("path");

function TRAY_MENU (UseCaseFactory, TrayWindow, context) {
    return Menu.buildFromTemplate([
        {
            label: 'show postit', click: () => {
                UseCaseFactory.create('show_postit');
            }
        },
        {
            label: 'add postit', click: () => {
                UseCaseFactory.create('add_postit');
            }
        },
        {
            label: 'select postit', click: () => {
                UseCaseFactory.create('select_postit');
            }
        },
        {
            label: 'quit postit', click: () => {
                UseCaseFactory.create('quit_postit');
            }
        },
    ]);
}


module.exports = TRAY_MENU;
