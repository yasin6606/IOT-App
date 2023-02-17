import {Connection, Message} from "amqp-ts";
import RabbitMQConnection from "src/classes/rabbitMQ/RabbitMQConnection";

class RabbitMQ extends Connection {

    public Message: Message = new Message();

    // constructor() {
        // connect to rabbitMQ
        // RabbitMQConnection.getConnection();
    // }
}

export default RabbitMQ;