// @ts-ignore
const {ipcRenderer} = require("electron");

// @ts-ignore
type TODO = any;

window.addEventListener('DOMContentLoaded', () => {

    let submit_button = document.querySelector("#dispatch_pile-submit")!;
    submit_button.addEventListener('click', (e: TODO) => {
        e.preventDefault();
        let remote_pile_remote_list = document.querySelector('#dispatch_pile-remote_list')!;
        // @ts-ignore
        let remote_pile_data = remote_pile_remote_list.selectedOptions[0].value;
        ipcRenderer.send('dispatch_pile:submit', remote_pile_data);
    });
});

ipcRenderer.on('dispatch_pile:display', (e: TODO, remote_piles: TODO) => {
    let remote_list_select = document.querySelector('#dispatch_pile-remote_list')!;
    for (let remote_pile of remote_piles) {
        let remote_pile_option = document.createElement('option');
        remote_pile_option.value = remote_pile.ip;
        remote_pile_option.text = remote_pile.name;
        // @ts-ignore
        remote_list_select.add(remote_pile_option);
    }
});


ipcRenderer.on('dispatch_pile:succeeded', (e: TODO, remote_pile_address: TODO) => {
    let dispatch_pile_success_div = document.querySelector('#dispatch_pile-success')!;
    dispatch_pile_success_div.innerHTML = `pile ${remote_pile_address} successfully dispatched`;
});

