const axios = require('axios');
const Pile = require("../postit/Pile");

axios.defaults.baseURL = 'http://localhost:8088';
axios.defaults.responseType = 'json';
axios.defaults.transformResponse=  [];

class Sender{
    static post(data) {
        axios.post('http://localhost:8088', data);
    }

    static async get_pile() {
        try {
            const response = await axios.get('/pile');
            return Pile.from_JSON(response.data);
       } catch (error) {
            console.error(error);
        }
    }
}

const SENDER = Sender;

module.exports = SENDER;