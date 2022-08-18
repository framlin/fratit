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

    static from_JSON(json_string) {
        let obj = JSON.parse(json_string);
        let result = new Postit();

        result.#text = obj.text;
        result.#creationDate = obj.creationDate;
        result.#expiration = new Date(obj.expiration);
        return result;
    }


    toJSON() {
        return {
            "text" : this.#text,
            "expiration": this.#expiration,
            "creationDate": this.#creationDate
        }

    }

}

module.exports = Postit