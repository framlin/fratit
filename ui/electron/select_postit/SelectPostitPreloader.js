const {ipcRenderer} = require("electron");

ipcRenderer.on('select_postit:display', (e, postits) => {
    let postit_list = document.querySelector('#postit-list');
    while(postit_list.firstChild) {
        postit_list.removeChild(postit_list.firstChild);
    }
    postits.forEach((postit,i) => {
        let postit_div = document.createElement("div");
        postit_div.innerHTML = postit;
        postit_div.setAttribute('data-index', i);
        postit_div.classList.add('postit-item');
        postit_div.addEventListener('click', (e) => {
            let selected_posted = e.target;
            let index = selected_posted.getAttribute('data-index');
            ipcRenderer.send('select_postit:select', index);
        });
        postit_list.prepend(postit_div);
    });
});

