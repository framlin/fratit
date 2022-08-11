class AddPostitInteractor {
    #response_boundary = null;
    #POST_OFFICE = null;

    constructor(response_boundary, POST_OFFICE) {
        this.#response_boundary = response_boundary;
        this.#POST_OFFICE = POST_OFFICE;
    }

    //@RequestBoundary
    execute(postit_data) {
        let pile = this.#POST_OFFICE.pile;
        let postit = this.#POST_OFFICE.create_postit();
        let date_parts = postit_data.expiration.split('.');

        postit.text = postit_data.text;
        postit.expiration = new Date(+date_parts[2], date_parts[1] - 1, +date_parts[0]);
        debugger
        pile.push(postit);

        this.#response_boundary.display(postit_data);
    }
}

module.exports = AddPostitInteractor;