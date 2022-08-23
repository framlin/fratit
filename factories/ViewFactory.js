const AddPostitView = require("../ui/electron/add_postit/AddPostitView");
const path = require("path");
const {Tray} = require("electron");
const TRAY_MENU = require("../ui/electron/tray/TrayMenu");
const SelectPostitView = require("../ui/electron/select_postit/SelectPostitView");
const ShowTopPostitView = require("../ui/electron/show_top_postit/ShowTopPostitView");
const DispatchPileView = require("../ui/electron/dispatch_pile/DispatchPileView");

let tray = null;
let show_top_postit_view;
let add_postit_view;
let select_postit_view;
let dispatch_pile_view;

function is_view_opened(viev) {
    return !viev?.isDestroyed() && viev?.isFocusable();
}

const PostitViews = {

    add_postit: (controller, interactor, POST_OFFICE) => {
        return (use_case) => {
            if (is_view_opened(add_postit_view)) {
                add_postit_view.close();
            }
            add_postit_view = new AddPostitView(use_case, controller, interactor, POST_OFFICE);
            add_postit_view.loadFile('ui/electron/add_postit/add_postit.html').then();
            // Open the DevTools.
            // add_postit_window.webContents.openDevTools();
            return add_postit_view;
        }
    },

    select_postit: (controller, interactor, POST_OFFICE) => {
        return (use_case) => {
            if (is_view_opened(select_postit_view)) {
                select_postit_view.close();
            }
            select_postit_view = new SelectPostitView(use_case, controller, interactor, POST_OFFICE);
            select_postit_view.loadFile('ui/electron/select_postit/select_postit.html').then();
            // Open the DevTools.
            // add_postit_window.webContents.openDevTools();
            return select_postit_view;
        }
    },

    show_top_postit: (controller, interactor, POST_OFFICE) => {
        return(use_case) => {
            if (is_view_opened(show_top_postit_view)) {
                show_top_postit_view.close();
            }
            show_top_postit_view = new ShowTopPostitView(use_case, controller, interactor, POST_OFFICE);
            show_top_postit_view.loadFile('ui/electron/show_top_postit/show_top_postit.html').then();
            // Open the DevTools.
            // add_postit_window.webContents.openDevTools();
            return show_top_postit_view;
        }
    },

    dispatch_pile: (controller, interactor, POST_OFFICE) => {
        return(use_case) => {
            if (is_view_opened(dispatch_pile_view)) {
                dispatch_pile_view.close();
            }
            dispatch_pile_view = new DispatchPileView(use_case, controller, interactor, POST_OFFICE);
            dispatch_pile_view.loadFile('ui/electron/dispatch_pile/dispatch_pile.html').then();
            // Open the DevTools.
            // add_postit_window.webContents.openDevTools();
            return dispatch_pile_view;
        }
    },

    tray: (POST_OFFICE) => {
        return (UseCaseFactory) => {

            if (!tray) {
                tray = new Tray(path.join(__dirname, '../ui/electron/tray/tray.png'));
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