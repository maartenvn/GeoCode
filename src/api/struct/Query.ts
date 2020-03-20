import Model from "./Model";
import QueryError from "./QueryError";

export default class Query<T extends Model | any> {
    public loading: boolean;
    public data: T;
    public error: QueryError;

    constructor() {
        // Set the query in an initial loading state.
        this.loading = true;
    }
}
