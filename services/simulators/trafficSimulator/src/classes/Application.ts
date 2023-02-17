import Sender from "src/classes/sender/Sender";

class Application {

    constructor() {
        this.startSending();
    }

    private startSending = (): void => {
        new Sender();
    };
}

export default Application;