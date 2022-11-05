const {app} = require('electron');
type TODO = any;
function common_use_case_creation(use_case_name: TODO) {
    let use_case = {
        name: use_case_name,
    }
    let interactor = UseCaseFactory.InteractorFactory.create(use_case);
    let controller = UseCaseFactory.ControllerFactory.create(use_case_name, interactor);
    let view = UseCaseFactory.ViewFactory.create(use_case_name, controller, interactor)(use_case);
    UseCaseFactory.PresenterFactory.create(use_case_name)(use_case, view, controller);
    return view;
}

const UseCases = {
    add_postit: common_use_case_creation,
    select_postit: common_use_case_creation,
    show_top_postit: common_use_case_creation,
    dispatch_pile: common_use_case_creation,

    flash_postit: () => {
        setInterval(() => {
            UseCaseFactory.create('show_top_postit');
        }, 60000 * 60); //1h
    },

    quit_postit: () => {
        app.quit();
    },
}


class NoSuchUseCase_ extends Error {}

export class UseCaseFactory {

    static ViewFactory: TODO;
    static PresenterFactory: TODO;
    static ControllerFactory: TODO;
    static InteractorFactory: TODO;
    static POST_OFFICE: TODO;
    static NoSuchUseCase: TODO = NoSuchUseCase_;


    static config(view_factory: TODO, presenter_factory: TODO, controller_factory: TODO, interactor_factory: TODO, post_office: TODO) {
        UseCaseFactory.ViewFactory = view_factory;
        UseCaseFactory.PresenterFactory = presenter_factory;
        UseCaseFactory.ControllerFactory = controller_factory;
        UseCaseFactory.InteractorFactory = interactor_factory;
        UseCaseFactory.POST_OFFICE = post_office;
    }


    static create(use_case: TODO) {
        // @ts-ignore
        if (!UseCases[use_case]) {
            throw new UseCaseFactory.NoSuchUseCase();
        } else {
            // @ts-ignore
            return UseCases[use_case](use_case);
        }
    }
}


module.exports = {UseCaseFactory};