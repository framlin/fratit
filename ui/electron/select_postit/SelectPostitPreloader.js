const {ipcRenderer} = require("electron");

ipcRenderer.on('postit_list', (e, postits) => {
    let postit_list = document.querySelector('#postit-list');
    postits.forEach((postit,i) => {
        let postit_div = document.createElement("div");
        postit_div.innerHTML = postit;
        postit_div.setAttribute('data-index', i);
        postit_div.classList.add('postit-item');
        postit_div.addEventListener('click', (e) => {
            let selected_posted = e.target;
            let index = selected_posted.getAttribute('data-index');
            ipcRenderer.send('postit:selected', index);
        });
        postit_list.prepend(postit_div);
    });
});

