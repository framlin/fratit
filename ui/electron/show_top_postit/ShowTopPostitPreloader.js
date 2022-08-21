const {ipcRenderer} = require('electron');

function get_postit_text_div() {
    return document.querySelector('#postit-text');
}

function send_on_click(element, ipc_channel) {
    element.addEventListener('click', (e) => {
            e.preventDefault();
            ipcRenderer.send(ipc_channel);
        }
    );
}

window.addEventListener('DOMContentLoaded', () => {
    send_on_click(document.querySelector('#postit-delete'), 'show_top_postit:delete') ;
    send_on_click(get_postit_text_div(), 'show_top_postit:close') ;
});

ipcRenderer.on('show_top_postit:display', (ev, postit) => {
    get_postit_text_div().innerHTML = postit.text;
    document.querySelector('#postit-expiration').innerHTML = postit.expiration;
});