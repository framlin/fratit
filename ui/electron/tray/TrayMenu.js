const {Menu} = require("electron");

function TRAY_MENU (UseCaseFactory) {
    return Menu.buildFromTemplate([
        {
            label: 'show top postit', click: () => {
                UseCaseFactory.create('show_top_postit');
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
