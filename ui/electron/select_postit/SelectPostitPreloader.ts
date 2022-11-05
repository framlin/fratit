// @ts-ignore
const {ipcRenderer} = require("electron");

// @ts-ignore
type TODO = any;
ipcRenderer.on('select_postit:display', (e:TODO, postits:TODO) => {
    let postit_list = document.querySelector('#postit-list')!;
    while(postit_list.firstChild) {
        postit_list.removeChild(postit_list.firstChild);
    }
    postits.forEach((postit:TODO, i:TODO) => {
        let postit_div = document.createElement("div");
        postit_div.innerHTML = postit;
        postit_div.setAttribute('data-index', i);
        postit_div.classList.add('postit-item');
        postit_div.addEventListener('click', (e:TODO) => {
            let selected_posted = e.target;
            let index = selected_posted.getAttribute('data-index');
            ipcRenderer.send('select_postit:select', index);
        });
        postit_list.prepend(postit_div);
    });
});

