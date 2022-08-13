const {Menu} = require("electron");
const path = require("path");

function TRAY_MENU (UseCaseFactory, TrayWindow, context) {
    return Menu.buildFromTemplate([
        {
            label: 'show postit', click: () => {
                context.tray_window = new TrayWindow(UseCaseFactory.WindowFactory.POST_OFFICE);
                context.tray_window.loadFile(path.join(__dirname, './tray.html')).then(() => {
                    context.tray_window.fetch_postit();
                    context.tray_window.show();
                });
            }
        },
        {
            label: 'add postit', click: () => {
                UseCaseFactory.create('add_postit')();
            }
        },
        {
            label: 'select postit', click: () => {
                UseCaseFactory.create('select_postit')();
            }
        },
    ]);
}


module.exports = TRAY_MENU;
