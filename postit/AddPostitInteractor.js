class AddPostitInteractor {
    #response_boundary = null;
    #POST_OFFICE = null;

    constructor(response_boundary, POST_OFFICE) {
        this.#response_boundary = response_boundary;
        this.#POST_OFFICE = POST_OFFICE;
    }

    //@RequestBoundary
    execute(text) {
        let pile = this.#POST_OFFICE.pile;
        let postit = this.#POST_OFFICE.create_postit();
        postit.text = text;
        pile.push(postit);
        this.#response_boundary.display(text);
    }
}

module.exports = AddPostitInteractor;