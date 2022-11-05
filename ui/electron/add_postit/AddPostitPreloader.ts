// @ts-ignore
const {ipcRenderer} = require("electron");

// @ts-ignore
type TODO = any;

window.addEventListener('DOMContentLoaded', (e:TODO) => {

    let submit_button = document.querySelector("#postit-submit")!;
    submit_button.addEventListener('click', (e:TODO) => {
        e.preventDefault();
        let postit_text = document.querySelector("#postit-text")!;
        let postit_expiration = document.querySelector("#postit-expiration")!;
        // @ts-ignore
        let postit_data = {text: postit_text.value, expiration: postit_expiration.value};
        ipcRenderer.send('postit:submitted', postit_data);

    });
});
