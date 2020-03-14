import Model from "../struct/Model";

export default class User implements Model {
    public id: number;
    public username: string;
    public avatarUrl: string;

    public parse(json: any): void {
        this.id = json.id;
        this.username = json.username;
        this.avatarUrl = json.avatarUrl;
    }
}
