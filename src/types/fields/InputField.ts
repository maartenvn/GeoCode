export class InputField {
    /**
     * Value of the input field.
     */
    value: unknown;

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
        this.value = field.value ? field.value : "";
        this.rules = field.rules ? field.rules : [];
        this.error = "";
    }
}
