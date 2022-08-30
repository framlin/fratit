const axios = require('axios');
const Pile = require("../postit/Pile");

axios.defaults.baseURL = 'http://localhost:8088';
axios.defaults.responseType = 'json';
axios.defaults.transformResponse=  [];

class Sender{
    static post(data, remote_pile_address) {
        axios.defaults.baseURL = `http://${remote_pile_address}:8088`
        axios.post(`http://${remote_pile_address}:8088`, data);
    }

    static async get_pile(remote_pile_address) {
        axios.defaults.baseURL = `http://${remote_pile_address}:8088`
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