const axios = require('axios');
import {Pile} from "../postit/Pile";

type TODO = any;

axios.defaults.baseURL = 'http://localhost:8088';
axios.defaults.responseType = 'json';
axios.defaults.transformResponse=  [];

export class Sender{
    static post(data: TODO, remote_pile_address: TODO) {
        axios.defaults.baseURL = `http://${remote_pile_address}:8088`
        axios.post(`http://${remote_pile_address}:8088`, data);
    }

    static async get_pile(remote_pile_address: TODO) {
        axios.defaults.baseURL = `http://${remote_pile_address}:8088`
        try {
            const response = await axios.get('/pile');
            return Pile.from_JSON(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}

export const SENDER = Sender;
module.exports = {SENDER};