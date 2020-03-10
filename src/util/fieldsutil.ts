export class InputFields {
    [prop: string]: InputField;
}

export class InputField {
    /**
     * Value of the input field.
     */
    value: string;

    /**
     * Rules that the input value has to comply with.
     */
    rules: Array<Function>;

    /**
     * Error message to display.
     */
    error: string;
}
