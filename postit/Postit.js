class Postit {
    #text;
    #expiration;
    #creationDate;

    get expiration() {
        return this.#expiration
    }

    set expiration(date) {
        this.#expiration = date;
    }

    get text() {
        return this.#text;
    }

    set text(text) {
        this.#text = text;
    }

    constructor() {
        this.#creationDate = Date.now();
        this.#text = "";
        this.#expiration = null;
    }

}

module.exports = Postit