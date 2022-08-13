const {ipcRenderer} = require("electron");

ipcRenderer.on('postit_list', (e, postits) => {
    let body = document.querySelector('body');
    postits.forEach((postit,i) => {
        let postit_div = document.createElement("div");
        postit_div.innerHTML = postit;
        postit_div.setAttribute('data-index', i);
        postit_div.addEventListener('click', (e) => {
            let selected_posted = e.target;
            let index = selected_posted.getAttribute('data-index');
            ipcRenderer.send('postit:selected', index);
        });
        body.appendChild(postit_div);
    });
});

