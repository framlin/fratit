class Postit {
    #text = "";
    #expiration = null;
    #creationDate = null;
    #last_update = 0;

    get last_update() {
        return this.#last_update;
    }

    get expiration() {
        return this.#expiration
    }

    set expiration(date) {
        this.#expiration = date;
        this.#last_update = Date.now();
    }

    get text() {
        return this.#text;
    }

    set text(text) {
        this.#text = text;
        this.#last_update = Date.now();
    }

    constructor(text, expiration, last_update) {
        this.#creationDate = Date.now();

        if (typeof text !== 'undefined') {
            this.#text = text;
        }

        if (typeof expiration !== 'undefined') {
            this.#expiration = expiration;
        }

        if (typeof last_update !== 'undefined') {
            this.#last_update = last_update;
        }
    }

    static from_JSON(json_string) {
        let obj = JSON.parse(json_string);
        let result = new Postit(obj.text, new Date(obj.expiration), obj.last_update);

        // result.#text = obj.text;
        result.#creationDate = obj.creationDate;
        // result.#expiration = new Date(obj.expiration);
        return result;
    }


    toJSON() {
        return {
            "text" : this.#text,
            "expiration": this.#expiration,
            "creationDate": this.#creationDate,
            "last_update": this.#last_update
        }

    }

}

module.exports = Postit