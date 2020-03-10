import Model from "../struct/Model";

export default class Location implements Model {
    public secretId: string;
    public name: string;
    public description: string;
    public latitude: number;
    public longitude: number;

    public parse(json: any): void {
        this.secretId = json.secretId;
        this.name = json.name;
        this.description = json.description;
        this.latitude = json.latitude;
        this.longitude = json.longitude;
    }
}
