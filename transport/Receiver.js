const http = require("http");
const Pile = require("../postit/Pile");

let PILE_DISPATCHER;

const server = http.createServer(async (req, res) => {
    const buffers = [];
    const { method } = req;
    switch (method) {
        case "GET":
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            let pile = JSON.stringify(PILE_DISPATCHER.local_pile);
            res.end(pile);
            break;
        case "POST":
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const data = Buffer.concat(buffers).toString();
            PILE_DISPATCHER.receive(Pile.from_JSON(data));
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

    static config(pile_dispatcher) {
        PILE_DISPATCHER = pile_dispatcher;
    }
}

const RECEIVER = Receiver;
module.exports = RECEIVER;
