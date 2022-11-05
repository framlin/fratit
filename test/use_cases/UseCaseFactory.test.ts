import {UseCaseFactory} from "../../factories/UseCaseFactory";
type TODO = any;
class view_factory_stub {
    static create(win: TODO) {
        return () => {
            return win + 42;
        }
    }
}

class presenter_factory_stub {
    static create(use_case: TODO) {
        return () => {
            return use_case + 42;
        }
    }
}

class controller_factory_stub{
    static create(use_case: TODO) {
        return () => {
            return use_case + 42;
        }
    }
}
class interactor_factory_stub{
    static create(use_case: TODO) {
        return () => {
            return use_case + 42;
        }
    }
}
const post_office_stub: TODO = {}

it("takes a add_postit and calls it with it's name as an Argument", () => {
    UseCaseFactory.config(view_factory_stub, presenter_factory_stub, controller_factory_stub, interactor_factory_stub, post_office_stub)
    let use_case = UseCaseFactory.create("add_postit");
    expect(use_case).toBe("add_postit42");
});

it("takes a show_top_postit and calls it with it's name as an Argument, if called with factories", () => {
    UseCaseFactory.config(view_factory_stub, presenter_factory_stub, controller_factory_stub, interactor_factory_stub, post_office_stub)
    let use_case = UseCaseFactory.create("show_top_postit");
    expect(use_case).toBe("show_top_postit42");
});


it("throws a NoSuchUseCase Error, if a invalif use-case-name is passed", () =>{
    // @ts-ignore
    UseCaseFactory.config(view_factory_stub);
    const t = () => {
        let use_case = UseCaseFactory.create("does_not_exist");
    }
    expect(t).toThrowError(UseCaseFactory.NoSuchUseCase);
});