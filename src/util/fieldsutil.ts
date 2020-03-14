export class InputFields {
    [prop: string]: InputField;
}

export class InputField {
    /**
     * Value of the input field.
     */
    value: any;

    /**
     * Rules that the input value has to comply with.
     */
    rules: Array<Function>;

    /**
     * Error message to display.
     */
    error: string;
}

export class InputErrors {
    /**
     * Array containing all the different input errors.
     */
    inputErrors: Array<InputError>;

    /**
     * Array containing all the different general errors.
     */
    generalErrors: Array<GeneralError>;
}

export class InputError {
    /**
     * Name of the field.
     */
    field: string;

    /**
     * Error message for the corresponding field.
     */
    message: string;
}

export class GeneralError {
    /**
     * Error message.
     */
    message: string;
}

/**
 * Map the InputField-objects on an object with values.
 * @param fields Object containing all the different InputField-objects
 */
export function getFieldValues(fields: InputFields): any {
    return Object.fromEntries(
        Object.entries(fields).map(([key, _]) => [key, fields[key].value])
    );
}

/**
 * Update the error message of each "InputField" with data from an InputError.
 * @param fields Object containing all the different InputField-objects.
 * @param error Error object containing the different errors.
 */
export function setFieldErrors(fields: InputFields, error: InputErrors): void {
    // Check if the input errors are defined.
    if (error !== undefined && error.inputErrors !== undefined) {
        return;
    }

    for (const inputError of error.inputErrors) {
        const field = fields[inputError.field];
        field.error = inputError.message;
    }
}
