const UseCases = {
    add_postit: () => {
        return UseCaseFactory.WindowFactory.create('add_postit');
    }
}


class UseCaseFactory {
    static WindowFactory;
    static config(window_factory) {
        UseCaseFactory.WindowFactory = window_factory;
    }

    static create(use_case) {
        return UseCases[use_case];
    }
}




module.exports = UseCaseFactory;