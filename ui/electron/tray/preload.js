const {ipcRenderer} = require("electron");

window.addEventListener('DOMContentLoaded', (event) => {

    ipcRenderer.on('postit:fetch', (e, text) => {
        let postit = document.querySelector("#content");
        postit.innerHTML=`<h1>${text}</h1>`;
    });

    let body = document.querySelector('body');
    body.addEventListener('click', () => {
        ipcRenderer.send('tray:close');
    });


});