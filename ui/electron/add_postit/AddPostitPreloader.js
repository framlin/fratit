const {ipcRenderer} = require("electron");

window.addEventListener('DOMContentLoaded', (event) => {

    let submit_button = document.querySelector("#postit-submit");
    submit_button.addEventListener('click', () => {
        let postit_text = document.querySelector("#postit-text");
        let postit_expiration = document.querySelector("#postit-expiration");

        let postit_data = {text: postit_text.value, expiration: postit_expiration.value};
        ipcRenderer.send('postit:submitted', postit_data);

        window.close();
    });
});
