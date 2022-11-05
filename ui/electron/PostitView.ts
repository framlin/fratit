const {BrowserWindow} = require('electron');
//type TODO = any;
export class PostitView extends BrowserWindow {
    _controller: TODO = null;
    _interactor: TODO = null;
    _POST_OFFICE: TODO = null;

    constructor(use_case: TODO, preloader_path: TODO, controller: TODO, interactor: TODO, POST_OFFICE: TODO) {
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

    display(...args:any[]) {}

}

module.exports = {PostitView};