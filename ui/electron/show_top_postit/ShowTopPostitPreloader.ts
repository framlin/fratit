// @ts-ignore
const {ipcRenderer} = require('electron');
// @ts-ignore
type TODO = any;
function get_postit_text_div() {
    return document.querySelector('#postit-text');
}

function send_on_click(element: TODO, ipc_channel: TODO) {
    element.addEventListener('click', (e: TODO) => {
            e.preventDefault();
            ipcRenderer.send(ipc_channel);
        }
    );
}

window.addEventListener('DOMContentLoaded', () => {
    send_on_click(document.querySelector('#postit-delete'), 'show_top_postit:delete') ;
    send_on_click(get_postit_text_div(), 'show_top_postit:close') ;
});

ipcRenderer.on('show_top_postit:display', (ev: TODO, postit: TODO) => {
    // @ts-ignore
    get_postit_text_div().innerHTML = postit.text;
    // @ts-ignore
    document.querySelector('#postit-expiration').innerHTML = postit.expiration;
});