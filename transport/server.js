const http = require("http");
const server = http.createServer(async (req, res) => {
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();

    console.log(JSON.parse(data).todo); // 'Buy the milk'
    res.end();
});
let port = 8088;
server.listen(port, () => {
    console.log(`Server running at port ${port}`)
})