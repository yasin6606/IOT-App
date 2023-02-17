import * as Amqp from "amqp-ts";

class RabbitMQConnection {
    private static CONNECTION: Amqp.Connection;

    // Singleton
    private constructor() {
    };

    private connect = (): Amqp.Connection => {
        const conn: Amqp.Connection = new Amqp.Connection(process.env.RABBIT_MQ_URL);

        console.info(`Rabbit MQ connected on ${process.env.RABBIT_MQ_URL}`);

        return conn;
    };

    private static listenersFunc = (): void => {
        RabbitMQConnection.CONNECTION.on("error_connection", (d) => console.log("error ", d));
    };

    public static getConnection = (): Amqp.Connection => {
        if (!RabbitMQConnection.CONNECTION) {
            const rabbit: RabbitMQConnection = new RabbitMQConnection();

            // connect rabbitMQ once
            RabbitMQConnection.CONNECTION = rabbit.connect();
            RabbitMQConnection.listenersFunc();
        }

        return RabbitMQConnection.CONNECTION;
    }
}

export default RabbitMQConnection;