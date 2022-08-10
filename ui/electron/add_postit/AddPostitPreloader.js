const {ipcRenderer} = require("electron");

window.addEventListener('DOMContentLoaded', (event) => {

    let submit_button = document.getElementById("submit");
    submit_button.addEventListener('click', () => {
        let postit = document.querySelector("#postit");
        ipcRenderer.send('postit:submitted', postit.value);
    });

    ipcRenderer.on('postit:created', () => {
        let postit = document.querySelector("#postit");
        postit.value = "";
    });

});
