import * as http from "http";
import {Server} from "socket.io";

class SocketIOConnection {
    private static INSTANCE: Server;

    private constructor() {
    };

    private httpServer = (): http.Server => {
        return http.createServer().listen({
            host: process.env.HTTP_SERVER_HOST,
            port: Number(process.env.HTTP_SERVER_PORT)
        });
    };

    private connect = (): Server => {
        const io: Server = new Server(this.httpServer(), {
            transports: ["websocket"],
            serveClient: true
        });

        console.info(`Socket IO successfully connected on ${process.env.HTTP_SERVER_HOST} ${process.env.HTTP_SERVER_PORT}`);

        io.on("connection", socket => {
            console.log(socket.id);
        });

        this.handleErrorEvent();

        io.on("disconnect", () => {
            console.info("socket disconnect");
        });

        return io;
    };

    private handleErrorEvent = (): void => {
        SocketIOConnection.INSTANCE?.on("error", err => {
            console.error(err);
        });
    };

    public static getConnection = (): Server => {
        if (!SocketIOConnection.INSTANCE) {
            const socketIoObj: SocketIOConnection = new SocketIOConnection();

            SocketIOConnection.INSTANCE = socketIoObj.connect();
        }

        return SocketIOConnection.INSTANCE;
    };
}

export default SocketIOConnection;