import Model from "../struct/Model";

export default class Location implements Model {
    public secretId: string;
    public name: string;
    public description: string;

    public parse(json: any): void {
        this.secretId = json.secret_id;
        this.name = json.name;
        this.description = json.description;
    }
}
