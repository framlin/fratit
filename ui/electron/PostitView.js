const {BrowserWindow} = require('electron');
const path = require("path");

class PostitView extends BrowserWindow {
    _controller = null;
    _interactor = null;
    _POST_OFFICE = null;

    constructor(use_case, preloader_path, ControllerFactory, InteractorFactory, POST_OFFICE) {
        super({
            width: 200,
            height: 200,
            alwaysOnTop: true,
            backgroundThrottling: false,
            webPreferences: {
                preload: preloader_path
            }
        });

        this._interactor = InteractorFactory.create(use_case.name, this);
        this._controller = ControllerFactory.create(use_case.name, this._interactor);
        this._POST_OFFICE = POST_OFFICE;

        this.on('closed', () => {
            use_case.view = null;
        })

        use_case.view = this;


    }

    //@ResponseBoundary
    display() {
    }

}

module.exports = PostitView;