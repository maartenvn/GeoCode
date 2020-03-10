import Model from "../struct/Model";

export default class Value implements Model {
    public value: string;

    public parse(json: unknown): void {
        this.value = json;
    }
}
