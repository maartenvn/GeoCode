import { Component, Vue } from "vue-property-decorator";
import QueryError from "../struct/QueryError";
import QueryErrorOptions from "../struct/QueryErrorOptions";
import ErrorBus from "./ErrorBus";

@Component
export default class ErrorMixin extends Vue {
    /**
     * Display an error message that will notify the user of an error.
     */
    $error(value: QueryError, options: QueryErrorOptions) {
        ErrorBus.$emit("error", value, options);
    }
}
