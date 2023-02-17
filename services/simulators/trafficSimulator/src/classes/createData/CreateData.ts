import FakeDataInterface from "src/assets/interfaces/FakeDataInterface";

class CreateData {
    private count: number = 0;

    public fakeData = (): FakeDataInterface => {
        return {name: `Yasin ${++this.count}`};
    };
}

export default CreateData;