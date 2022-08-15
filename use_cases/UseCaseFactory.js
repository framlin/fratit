const {app} = require("electron");
const UseCases = {
    add_postit: (use_case) => UseCaseFactory.PresenterFactory.create(use_case)({
        name: use_case
    }),
    select_postit: (use_case) => UseCaseFactory.PresenterFactory.create(use_case)({
        name: use_case
    }),
    show_postit: (use_case) => UseCaseFactory.PresenterFactory.create(use_case)({
        name: use_case
    }),
    flash_postit: (use_case) => {
        setInterval(() => {
            UseCaseFactory.create('show_postit');
        }, 60000 * 60); //1h
    },
    quit_postit: (use_case) => {
        app.quit();
    },
}


class UseCaseFactory {
    static PresenterFactory;

    static config(window_factory) {
        UseCaseFactory.PresenterFactory = window_factory;
    }

    static create(use_case) {
        return UseCases[use_case](use_case);
    }
}


module.exports = UseCaseFactory;