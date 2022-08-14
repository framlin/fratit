const {BrowserWindow} = require('electron');
const path = require("path");

class PostitPresenter extends BrowserWindow {
    _controller = null;
    _request_boundary = null;
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

        this._request_boundary = InteractorFactory.create(use_case.name, this);
        this._controller = ControllerFactory.create(use_case.name, this._request_boundary);
        this._POST_OFFICE = POST_OFFICE;

        this.on('closed', () => {
            use_case.presenter = null;
        })

        use_case.presenter = this;


    }

    //@ResponseBoundary
    display() {
    }

}

module.exports = PostitPresenter;