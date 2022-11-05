const http = require("http");
import {Pile} from"../postit/Pile";

type TODO = any;
let PILE_DISPATCHER: TODO;

const server = http.createServer(async (req: TODO, res: TODO) => {
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

    static config(pile_dispatcher: TODO) {
        PILE_DISPATCHER = pile_dispatcher;
    }
}

export const RECEIVER = Receiver;
module.exports = {RECEIVER};
