export class InputField<T> {
    /**
     * Value of the input field.
     */
    value: T | unknown;

    /**
     * Rules that the input value has to comply with.
     */
    rules: Array<Function>;

    /**
     * Error message to display.
     */
    error: string;

    /**
     * Constructor without values
     */
    constructor(field: { value?: any; rules?: Array<Function> } = {}) {
        this.value = field.value !== undefined ? field.value : "";
        this.rules = field.rules !== undefined ? field.rules : [];
        this.error = "";
    }
}
