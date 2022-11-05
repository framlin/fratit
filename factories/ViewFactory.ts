const path = require("path");
const {Tray} = require("electron");
import {TRAY_MENU} from "../ui/electron/tray/TrayMenu";
import {AddPostitView} from "../ui/electron/add_postit/AddPostitView";
import {SelectPostitView} from "../ui/electron/select_postit/SelectPostitView";
import {ShowTopPostitView} from "../ui/electron/show_top_postit/ShowTopPostitView";
import {DispatchPileView} from "../ui/electron/dispatch_pile/DispatchPileView";

type TODO = any;
let tray: TODO = null;
let show_top_postit_view: TODO;
let add_postit_view: TODO;
let select_postit_view: TODO;
let dispatch_pile_view: TODO;

function is_view_opened(viev: TODO) {
    return !viev?.isDestroyed() && viev?.isFocusable();
}

const PostitViews = {

    add_postit: (controller: TODO, interactor: TODO, POST_OFFICE: TODO) => {
        return (use_case: TODO) => {
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

    select_postit: (controller: TODO, interactor: TODO, POST_OFFICE: TODO) => {
        return (use_case: TODO) => {
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

    show_top_postit: (controller: TODO, interactor: TODO, POST_OFFICE: TODO) => {
        return(use_case: TODO) => {
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

    dispatch_pile: (controller: TODO, interactor: TODO, POST_OFFICE: TODO) => {
        return(use_case: TODO) => {
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

    tray: (POST_OFFICE: TODO) => {
        return (UseCaseFactory: TODO) => {

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

export class ViewFactory {
    static POST_OFFICE: TODO;

    static config(post_office: TODO) {
        ViewFactory.POST_OFFICE = post_office;
    }

    static create(use_case_name: TODO, controller?: TODO, interactor?: TODO) {
        if ((typeof controller !== 'undefined') && (typeof interactor !== 'undefined')) {
            // @ts-ignore
            return PostitViews[use_case_name](controller, interactor, ViewFactory.POST_OFFICE);
        } else {
            // @ts-ignore
            return PostitViews[use_case_name](ViewFactory.POST_OFFICE);
        }
    }
}


module.exports = {ViewFactory};