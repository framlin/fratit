const http = require("http");
const Pile = require("../postit/Pile");
let POST_OFFICE;
const server = http.createServer(async (req, res) => {
    const buffers = [];
    const { method } = req;
    switch (method) {
        case "GET":
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            let pile = JSON.stringify(POST_OFFICE.pile);
            res.end(pile);
            break;
        case "POST":
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const data = Buffer.concat(buffers).toString();
            POST_OFFICE.pile = Pile.from_JSON(data);
            res.end();
            break;
    }

});



class Receiver {
    static port  = 8088;
    static start() {
        server.listen(Receiver.port, () => {
            console.log(`Server running at port ${Receiver.port}`)
        })
    }

    static config(post_office) {
        POST_OFFICE = post_office;
    }
}

const RECEIVER = Receiver;
module.exports = RECEIVER;
