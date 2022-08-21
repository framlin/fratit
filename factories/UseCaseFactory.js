const {app} = require('electron');

function common_use_case_creation(use_case_name) {
    let use_case = {
        name: use_case_name,
    }
    let interactor = UseCaseFactory.InteractorFactory.create(use_case);
    let controller = UseCaseFactory.ControllerFactory.create(use_case_name, interactor);
    let view = UseCaseFactory.ViewFactory.create(use_case_name, controller, interactor)(use_case);
    UseCaseFactory.PresenterFactory.create(use_case_name)(use_case, view, controller, UseCaseFactory.POST_OFFICE);
    return view;
}

const UseCases = {
    add_postit: common_use_case_creation,
    select_postit: common_use_case_creation,
    show_top_postit: common_use_case_creation,

    flash_postit: () => {
        setInterval(() => {
            UseCaseFactory.create('show_postit');
        }, 60000 * 60); //1h
    },

    quit_postit: () => {
        app.quit();
    },
}


class NoSuchUseCase_ extends Error {}

class UseCaseFactory {

    static ViewFactory;
    static PresenterFactory;
    static ControllerFactory;
    static InteractorFactory;
    static POST_OFFICE;
    static NoSuchUseCase = NoSuchUseCase_;


    static config(view_factory, presenter_factory, controller_factory, interactor_factory, post_office) {
        UseCaseFactory.ViewFactory = view_factory;
        UseCaseFactory.PresenterFactory = presenter_factory;
        UseCaseFactory.ControllerFactory = controller_factory;
        UseCaseFactory.InteractorFactory = interactor_factory;
        UseCaseFactory.POST_OFFICE = post_office;
    }


    static create(use_case) {
        if (!UseCases[use_case]) {
            throw new UseCaseFactory.NoSuchUseCase();
        } else {
            return UseCases[use_case](use_case);
        }
    }
}


module.exports = UseCaseFactory;