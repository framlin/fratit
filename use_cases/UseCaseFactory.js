const UseCases = {
    add_postit: (use_case) => UseCaseFactory.PresenterFactory.create(use_case)({
        name: use_case
    }),
    select_postit: (use_case) => UseCaseFactory.PresenterFactory.create(use_case)({
        name: use_case
    }),
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