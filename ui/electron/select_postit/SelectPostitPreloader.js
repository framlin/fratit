const {ipcRenderer} = require("electron");

window.addEventListener('DOMContentLoaded', (event) => {

    //on-click of a postit of the pistit list, "postit:seöected", selected_postit woll be sent

    // let submit_button = document.querySelector("#postit-submit");
    // submit_button.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     let postit_text = document.querySelector("#postit-text");
    //     let postit_expiration = document.querySelector("#postit-expiration");
    //
    //     let postit_data = {text: postit_text.value, expiration: postit_expiration.value};
    //     ipcRenderer.send('postit:submitted', postit_data);
    //
    // });
});
