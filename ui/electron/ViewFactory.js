const AddPostitView = require("./add_postit/AddPostitView");
const TrayWindow = require("./tray/TrayWindow");
const path = require("path");
const {Tray, app} = require("electron");
const TRAY_MENU = require("./tray/TrayMenu");
const SelectPostitView = require("./select_postit/SelectPostitView");

let tray = null;

const PostitViews = {

    add_postit: (controller, interactor, POST_OFFICE) => {
        return (use_case) => {
            let add_postit_view = new AddPostitView(use_case, controller, interactor, POST_OFFICE);
            add_postit_view.loadFile('ui/electron/add_postit/add_postit.html').then();
            // Open the DevTools.
            // add_postit_window.webContents.openDevTools();
            return add_postit_view;
        }
    },

    select_postit: (controller, interactor, POST_OFFICE) => {
        return (use_case) => {
            let select_postit_view = new SelectPostitView(use_case, controller, interactor, POST_OFFICE);
            select_postit_view.loadFile('ui/electron/select_postit/select_postit.html').then();
            // Open the DevTools.
            // add_postit_window.webContents.openDevTools();
            return select_postit_view;
        }
    },

    show_postit: (POST_OFFICE) => {
        return () => {
            let tray_window = new TrayWindow(POST_OFFICE);
            tray_window.loadFile(path.join(__dirname, './tray/tray.html')).then(() => {
                tray_window.fetch_postit();
                tray_window.show();
            });
            // Open the DevTools.
            // add_postit_window.webContents.openDevTools();
            return tray_window;
        }
    },
    tray: (POST_OFFICE) => {
        return (UseCaseFactory) => {

            if (!tray) {
                tray = new Tray(path.join(__dirname, './tray/tray.png'));
                // app.dock.hide();
                const tray_menu = TRAY_MENU (UseCaseFactory)
                tray.setToolTip('FRAmlins posTIT')
                tray.setContextMenu(tray_menu);
            }
        }
    },

};

class ViewFactory {
    static POST_OFFICE;

    static config(post_office) {
        ViewFactory.POST_OFFICE = post_office;
    }

    static create(use_case_name, controller, interactor) {
        if ((typeof controller !== 'undefined') && (typeof interactor !== 'undefined')) {
            return PostitViews[use_case_name](controller, interactor, ViewFactory.POST_OFFICE);
        } else {
            return PostitViews[use_case_name](ViewFactory.POST_OFFICE);
        }
    }
}


module.exports = ViewFactory;