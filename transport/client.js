const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8088';
axios.post('http:/127.0.0.1:8088/todos', {
    todo: 'Buy the milk',
});