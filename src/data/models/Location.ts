import Model from "../struct/Model";

export default class Location implements Model {
    public secretId: string;
    public name: string;
    public description: string;
    public lat: number;
    public long: number;

    public parse(json: unknown): void {
        this.secretId = json.secret_id;
        this.name = json.name;
        this.description = json.description;
        this.lat = json.lat;
        this.long = json.long;
    }
}
