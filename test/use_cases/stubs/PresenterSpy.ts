type TODO = any;
export class PresenterSpy {
    present_called = false;
    passed_value = null;

    present(value: TODO) {
        this.present_called = true;
        this.passed_value = value;
    }
}

module.exports = {PresenterSpy};