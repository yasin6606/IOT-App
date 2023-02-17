// import RabbitMQ from "src/classes/rabbitMQ/RabbitMQ";
import RabbitMQConnection from "src/classes/rabbitMQ/RabbitMQConnection";

class Application {

    constructor() {
        this.setSocket();
        this.setBroker();
    };

    private setSocket = (): void => {

    };

    private setBroker = (): void => {
        const rabbitCon = RabbitMQConnection.getConnection();
        console.log(rabbitCon);
    };
}

export default Application;