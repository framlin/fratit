export class ControllerSpy {
    run_use_case_called = false;
    run_use_case() {
        this.run_use_case_called = true;
    }
}

module.exports = {ControllerSpy};