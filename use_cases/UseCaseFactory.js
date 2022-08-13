const UseCases = {
    add_postit: (use_case) => UseCaseFactory.WindowFactory.create(use_case)({
        name: use_case
    }),
    select_postit: (use_case) => UseCaseFactory.WindowFactory.create(use_case)({
        name: use_case
    }),
}


class UseCaseFactory {
    static WindowFactory;
    static config(window_factory) {
        UseCaseFactory.WindowFactory = window_factory;
    }

    static create(use_case) {
        return UseCases[use_case](use_case);
    }
}




module.exports = UseCaseFactory;