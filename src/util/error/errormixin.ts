import { Component, Vue } from "vue-property-decorator";
import ErrorBus from "./errorbus";
import { ErrorValue, ErrorOptions } from "./error";

@Component
export default class ErrorMixin extends Vue {
    /**
     * Display an error message that will notify the user of an error.
     */
    $error(value: ErrorValue, options: ErrorOptions) {
        ErrorBus.$emit("error", value, options);
    }
}
