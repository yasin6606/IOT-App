import express, {Express} from "express";
import * as http from "http";
import {Server} from "http";
import cors from "cors";
import bodyParser from "body-parser";
import routeNotFoundMiddleware from "src/middlewares/exceptions/routeNotFound.middleware";

class Application {

    private app: Express | undefined;
    private httpServer: Server | undefined;
    private port: number = Number(process.env.PORT) || 5001;
    private ip: string = process.env.HOST || "192.168.1.109";

    public start = async (): Promise<void> => {
        this.setServer();

        this.httpServer?.listen(this.port, this.ip, () => {
            console.info(`server run on ${this.ip}:${this.port}`);
        });

        this.setConfigs();
        await this.setRoutes();
    };

    // set server
    setServer = (): void => {
        const expressServer: Express = express();

        this.httpServer = http.createServer(expressServer);

        this.app = expressServer;
    };

    // set server configs
    private setConfigs = (): void => {
        this.app?.use(cors());
        this.app?.use(bodyParser.json());
        this.app?.use(bodyParser.urlencoded({extended: true}));
    };

    // set routing
    setRoutes = async (): Promise<void> => {
        const routes = await import("src/routes/index");

        this.app?.use(routes.default, routeNotFoundMiddleware);
    };
}

export default Application;