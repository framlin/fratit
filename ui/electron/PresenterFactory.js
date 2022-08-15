const AddPostitPresenter = require("./add_postit/AddPostitPresenter");
const TrayWindow = require("./tray/TrayWindow");
const path = require("path");
const {Tray, app} = require("electron");
const TRAY_MENU = require("./tray/TrayMenu");
const SelectPostitPresenter = require("./select_postit/SelectPostitPresenter");

const PostitPresenter = {

    tray: (ControllerFactory, InteractorFactory, POST_OFFICE) => {
        return (UseCaseFactory) => {
            let tray_window = new TrayWindow(POST_OFFICE);
            tray_window.loadFile(path.join(__dirname, './tray/tray.html')).then(() => {
                let tray = new Tray(path.join(__dirname, './tray/tray.png'));
                // app.dock.hide();

                const tray_menu = TRAY_MENU (UseCaseFactory, TrayWindow, {tray_window})

                tray.setToolTip('FRAmlins posTIT')
                tray.setContextMenu(tray_menu);

                // Open the DevTools.
                // tray_window.webContents.openDevTools()
                return tray_window;
            });
        }
    },

    add_postit: (ControllerFactory, InteractorFactory, POST_OFFICE) => {
        return (UseCase) => {
            let add_postit_presenter = new AddPostitPresenter(UseCase, ControllerFactory, InteractorFactory, POST_OFFICE);
            add_postit_presenter.loadFile('ui/electron/add_postit/add_postit.html').then();
            // Open the DevTools.
            // add_postit_window.webContents.openDevTools();
            return add_postit_presenter;
        }
    },

    select_postit: (ControllerFactory, InteractorFactory, POST_OFFICE) => {
        return (UseCase) => {
            let select_postit_presenter = new SelectPostitPresenter(UseCase, ControllerFactory, InteractorFactory, POST_OFFICE);
            select_postit_presenter.loadFile('ui/electron/select_postit/select_postit.html').then(() => {
                select_postit_presenter.run_use_case();
            });
            // Open the DevTools.
            // add_postit_window.webContents.openDevTools();
            return select_postit_presenter;
        }
    },

    show_postit: (ControllerFactory, InteractorFactory, POST_OFFICE) => {
        return (UseCase) => {
            let tray_window = new TrayWindow(POST_OFFICE);
            tray_window.loadFile(path.join(__dirname, './tray/tray.html')).then(() => {
                tray_window.fetch_postit();
                tray_window.show();
            });
            // Open the DevTools.
            // add_postit_window.webContents.openDevTools();
            return tray_window;
        }
    }
};

class PresenterFactory {
    static ControllerFactory;
    static InteractorFactory;
    static POST_OFFICE;

    static config(controller_factory, interactor_factory, post_office) {
        PresenterFactory.ControllerFactory = controller_factory;
        PresenterFactory.InteractorFactory = interactor_factory;
        PresenterFactory.POST_OFFICE = post_office;
    }

    static create(win) {
        return PostitPresenter[win](PresenterFactory.ControllerFactory, PresenterFactory.InteractorFactory, PresenterFactory.POST_OFFICE);
    }
}


module.exports = PresenterFactory;