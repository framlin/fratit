type TODO = any
export class Postit {
    private _text = "";
    private _expiration: Date | null = null;
    private _creationDate: number | null = null;
    private _last_update = 0;

    constructor(text?: string, expiration?: Date, last_update?: number) {
        this._creationDate = Date.now();

        if (typeof text !== 'undefined') {
            this._text = text;
        }

        if (typeof expiration !== 'undefined') {
            this._expiration = expiration;
        }

        if (typeof last_update !== 'undefined') {
            this._last_update = last_update;
        }
    }

    get id () {
        return this._creationDate;
    }

    get last_update() {
        return this._last_update;
    }

    get expiration() {
        return this._expiration
    }

    set expiration(date) {
        this._expiration = date;
        this._last_update = Date.now();
    }

    get text() {
        return this._text;
    }

    set text(text) {
        this._text = text;
        this._last_update = Date.now();
    }

    is_same_as(postit_to_compare_with: Postit) {
        return this.id === postit_to_compare_with.id;
    }

    is_equal_with(postit_to_compare_with: Postit) {
        let same_expiration =
            (this.expiration === postit_to_compare_with.expiration) ||
            ((this.expiration && this.expiration.getTime()) === (postit_to_compare_with.expiration && postit_to_compare_with.expiration.getTime()));

        return this.is_same_as(postit_to_compare_with) &&
            (this.text === postit_to_compare_with.text) && same_expiration;

    }

    is_more_current(postit_to_compare_with: Postit) {
        return this.last_update > postit_to_compare_with.last_update;
    }

    static from_JSON(json_string: TODO) {
        let obj = JSON.parse(json_string);
        let date = obj.expiration ? new Date(obj.expiration) : undefined;
        let result = new Postit(obj.text, date, obj.last_update);

        result._creationDate = obj.creationDate;
        return result;
    }

    toJSON() {
        return {
            "text" : this._text,
            "expiration": this._expiration,
            "creationDate": this._creationDate,
            "last_update": this._last_update
        }

    }
}

module.exports = {Postit}