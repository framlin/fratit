class AddPostitController{
    #request_boundary = null;
    constructor(request_boundary) {
        this.#request_boundary = request_boundary;
    }

    add_postit(text) {
        this.#request_boundary.execute(text);
    }
}

module.exports = AddPostitController;