import Model from "./Model";

export default class Query<T extends Model | any> {
    public loading: boolean;
    public data: T;
    public error: string;

    constructor() {
        // Set the query in an initial loading state.
        this.loading = true;
    }
}
