import Model from "../struct/Model";

export default class User implements Model {
    public id: number;
    public username: string;
    public email: string;
    public avatarUrl: string;

    public parse(json: any): void {
        this.id = json.id;
        this.username = json.username;
        this.email = json.email;
        this.avatarUrl = json.avatarUrl;
    }
}
