import Model from "../struct/Model";

export default class Location implements Model {
    public id: number;
    public name: string;
    public description: string;

    public parse(json: any): void {
        this.id = json.id;
        this.name = json.name;
        this.description = json.description;
    }
}
