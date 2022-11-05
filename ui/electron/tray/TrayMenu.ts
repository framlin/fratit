const {Menu} = require("electron");
type TODO = any;
export function TRAY_MENU (UseCaseFactory: TODO) {
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
            label: 'dispatch pile', click: () => {
                UseCaseFactory.create('dispatch_pile');
            }
        },
        {
            label: 'quit postit', click: () => {
                UseCaseFactory.create('quit_postit');
            }
        },
    ]);
}


module.exports = {TRAY_MENU};
