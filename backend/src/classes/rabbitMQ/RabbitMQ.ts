import {Connection, Message} from "amqp-ts";
import RabbitMQConnection from "src/classes/rabbitMQ/RabbitMQConnection";

class RabbitMQ extends Connection {

    private readonly defaultAltExchangeName: string = "al";
    public Message: Message = new Message();

    constructor() {
        super();

        this.run().then();
    };

    // run rabbitMQ service and initialize default exchanges and queues
    private run = async (): Promise<void> => {
        // connect rabbitMQ
        RabbitMQConnection.getConnection();

        this.alternateExchange();
        this.defaultExchanges();
        this.defaultQueues();
        await this.defaultBinding();

        // setInterval(() => {
        //     m.setContent("traffic content");
        //     m.sendTo(this._exchanges["traffic"], "trafficRoutingKey");
        // }, 2000);
        // setInterval(() => {
        //     m.setContent("weather content");
        //     m.sendTo(this._exchanges["weather"], "weatherRoutingKey");
        // }, 3000);
        // setInterval(() => {
        //     m.setContent("al content");
        //     m.sendTo(this._exchanges["weather"], "weatherRoutingKey1");
        // }, 6000);
    };

    // declare alternate exchange to receive un-routed messages from other exchanges
    private alternateExchange = (): void => {
        this.declareExchange(this.defaultAltExchangeName, "fanout");
    };

    private defaultExchanges = (): void => {
        this.declareExchange("traffic", "direct", {alternateExchange: this.defaultAltExchangeName});
        this.declareExchange("weather", "direct", {alternateExchange: this.defaultAltExchangeName});
    };

    private defaultQueues = (): void => {
        this.declareQueue("alQueue");
        this.declareQueue("trafficQueue");
        this.declareQueue("weatherQueue");
    };

    private defaultBinding = async (): Promise<void> => {
        await this._queues["alQueue"].bind(this._exchanges["al"]);
        await this._queues["trafficQueue"].bind(this._exchanges["traffic"], "trafficRoutingKey");
        await this._queues["weatherQueue"].bind(this._exchanges["weather"], "weatherRoutingKey");
    };
}

export default RabbitMQ;