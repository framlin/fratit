const {BrowserWindow} = require('electron');
class PostitView extends BrowserWindow {
    _controller = null;
    _interactor = null;
    _POST_OFFICE = null;

    constructor(use_case, preloader_path, controller, interactor, POST_OFFICE) {
        super({
            width: 200,
            height: 200,
            alwaysOnTop: true,
            backgroundThrottling: false,
            webPreferences: {
                preload: preloader_path
            }
        });

        this._interactor = interactor;
        this._controller = controller;
        this._POST_OFFICE = POST_OFFICE;

        this.on('closed', () => {
            use_case.view = null;
        })

        use_case.view = this;


    }

    display() {}

}

module.exports = PostitView;