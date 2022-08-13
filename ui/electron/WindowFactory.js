const AddPostitWindow = require("./add_postit/AddPostitWindow");
const TrayWindow = require("./tray/TrayWindow");
const path = require("path");
const {Tray, app, Menu} = require("electron");
const TRAY_MENU = require("./tray/TrayMenu");

const PostitWindows = {
    tray: (ControllerFactory, InteractorFactory, POST_OFFICE) => {
        return (UseCaseFactory) => {
            create_tray_window (UseCaseFactory, POST_OFFICE);
        }

    },
    add_postit: (ControllerFactory, InteractorFactory, POST_OFFICE) => {
        let add_postit_window = new AddPostitWindow(ControllerFactory, InteractorFactory, POST_OFFICE);
        add_postit_window.loadFile('ui/electron/add_postit/add_postit.html').then();
        // Open the DevTools.
        // add_postit_window.webContents.openDevTools();
        return add_postit_window;
    },
}

class WindowFactory {
    static ControllerFactory;
    static InteractorFactory;
    static POST_OFFICE;

    static config(controller_factory, interactor_factory, post_office) {
        WindowFactory.ControllerFactory = controller_factory;
        WindowFactory.InteractorFactory = interactor_factory;
        WindowFactory.POST_OFFICE = post_office;
    }

    static create(win) {
        return PostitWindows[win](WindowFactory.ControllerFactory, WindowFactory.InteractorFactory, WindowFactory.POST_OFFICE);
    }
}




function create_tray_window (UseCaseFactory, POST_OFFICE) {
    let tray_window = new TrayWindow(POST_OFFICE);
    tray_window.loadFile(path.join(__dirname, './tray/tray.html')).then(() => {
        let tray = new Tray(path.join(__dirname, './tray/tray.png'));
        app.dock.hide();

        const tray_menu = TRAY_MENU (UseCaseFactory, TrayWindow, {tray_window})

        tray.setToolTip('framlins postit')
        tray.setContextMenu(tray_menu);

        // Open the DevTools.
        // tray_window.webContents.openDevTools()
        return tray_window;
    });
}

module.exports = WindowFactory;