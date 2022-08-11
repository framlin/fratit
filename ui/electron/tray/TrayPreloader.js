const {ipcRenderer} = require("electron");

window.addEventListener('DOMContentLoaded', () => {

    ipcRenderer.on('postit:fetch', (e, postit_data) => {
        let postit_text = document.querySelector("#postit-text");
        let postit_expiration = document.querySelector("#postit-expiration");
        postit_text.innerHTML = postit_data.text;
        postit_expiration.innerHTML = postit_data.expiration.toLocaleString('de-DE').split(',')[0]
    });

    let postit_text = document.querySelector('#postit-text');
    postit_text.addEventListener('click', (e) => {
        e.preventDefault();
        ipcRenderer.send('tray:close');
    });

    let delete_button = document.querySelector("#postit-delete");
    delete_button.addEventListener('click', (e) => {
        e.preventDefault();
        ipcRenderer.send('postit:delete', "DELETE");
    })

});