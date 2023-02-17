import CreateData from "src/classes/createData/CreateData";
import FakeDataInterface from "src/assets/interfaces/FakeDataInterface";
import SocketIOConnection from "src/classes/socketIO/SocketIOConnection";
import {Server} from "socket.io";
import {FAKE_DATA_EVENT} from "src/assets/helpers/SocketIOEvents";

class Sender {

    private readonly trafficDataInterval;
    private readonly io: Server;
    private createDataCon: CreateData;
    private sendTime: number = 1000;

    constructor() {
        this.createDataCon = new CreateData();

        this.io = SocketIOConnection.getConnection();

        this.trafficDataInterval = setInterval(this.intervalFunc, this.sendTime);
    };

    private intervalFunc = (): void => {
        const o: FakeDataInterface = this.createDataCon.fakeData();

        this.startSendingOnSocket(this.io, o);
    };

    // start sending fake data on a specific port on the SocketIO
    private startSendingOnSocket = (io: Server, data: FakeDataInterface): void => {
        io.emit(FAKE_DATA_EVENT, data);
    };

    public stopSending = (): void => {
        clearInterval(this.trafficDataInterval);
    };
}

export default Sender;