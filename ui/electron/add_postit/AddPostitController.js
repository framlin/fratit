class AddPostitController{
    #request_boundary = null;
    constructor(request_boundary) {
        this.#request_boundary = request_boundary;
    }

    add_postit(postit_data) {
        this.#request_boundary.execute(postit_data);
    }
}

module.exports = AddPostitController;