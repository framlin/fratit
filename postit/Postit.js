class Postit {
    #text = "";
    #expiration = null;
    #creationDate = null;
    #last_update = 0;

    get id () {
        return this.#creationDate;
    }
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

    is_same_as(postit_to_compare_with) {
        return this.id === postit_to_compare_with.id;
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

        result.#creationDate = obj.creationDate;
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