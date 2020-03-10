import Model from "./Model";
import { ErrorValue } from "@/util/error/errormixin";

export default class Query<T extends Model | unknown> {
    public loading: boolean;
    public data: T;
    public error: ErrorValue;

    constructor() {
        // Set the query in an initial loading state.
        this.loading = true;
    }
}
