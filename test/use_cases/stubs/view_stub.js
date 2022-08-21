class view_stub {
    display_called = false;
    passed_display_value = null;
    display(value) {
        this.display_called = true;
        this.passed_display_value = value;
    }

    registered_event = null;
    register_event_called = false;
    once(ev, callback) {
        this.registered_event = ev;
        this.register_event_called = true;
        callback()
    }
}

module.exports = view_stub;