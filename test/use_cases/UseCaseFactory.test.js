const UseCaseFactory = require("../../use_cases/UseCaseFactory");
class presenter_factory_stub {
    static create(win) {
        return () => {
            return win + 42;
        }
    }
}
it("takes a add_postit and calls it with it's name as an Argument", () => {
    UseCaseFactory.config(presenter_factory_stub)
    let use_case = UseCaseFactory.create("add_postit");
    expect(use_case).toBe("add_postit42");
});

it("throws a NoSuchUseCase Error, if a invalif use-case-name is passed", () =>{
    UseCaseFactory.config(presenter_factory_stub);
    const t = () => {
        let use_case = UseCaseFactory.create("does_not_exist");
    }
    expect(t).toThrowError(UseCaseFactory.NoSuchUseCase);
});