type TODO = any;
export class ViewSpy {
    display_called = false;
    passed_display_value = null;
    display(value: TODO) {
        this.display_called = true;
        this.passed_display_value = value;
    }

    registered_event = null;
    register_event_called = false;
    once(ev: TODO, callback: TODO) {
        this.registered_event = ev;
        this.register_event_called = true;
        callback()
    }
}

module.exports = {ViewSpy};