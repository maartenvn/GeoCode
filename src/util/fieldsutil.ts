import QueryError from "@/api/struct/QueryError";

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

    /**
     * Constructor without values
     */
    constructor(field: { value?: any; rules?: Array<Function> } = {}) {
        this.value = field.value ? field.value : "";
        this.rules = field.rules ? field.rules : [];
        this.error = "";
    }
}

export class InputFieldsUpdate {
    [prop: string]: string;
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
export function setFieldErrors(fields: InputFields, error: QueryError): void {
    // Check if the input errors are undefined.
    if (
        error === undefined ||
        error.response === undefined ||
        error.response.inputErrors === undefined
    ) {
        return;
    }

    // Set the error messages for every field.
    for (const fieldName of Object.keys(fields)) {
        const fieldValue = fields[fieldName];
        const fieldNewError = error.response.inputErrors.find(
            (inputError: InputError) => inputError.field === fieldName
        );

        // Set the new error message, when available.
        if (fieldNewError !== undefined) {
            fieldValue.error = fieldNewError.message;
        }

        // Otherwise set an empty error.
        else {
            fieldValue.error = "";
        }
    }
}

/**
 * Extract the general error from the input error.
 * It will take the first element in the general errors list.
 * @param error Error object containing the different errors.
 */
export function modifyGeneralError(error: QueryError): QueryError {
    // Check if the input errors are undefined.
    if (
        error === undefined ||
        error.response === undefined ||
        error.response.generalErrors === undefined
    ) {
        return error;
    }

    // Check if any general error was found.
    if (error.response.generalErrors.length > 0) {
        // Modify the error message to contain the first general error.
        error.message = error.response.generalErrors[0].message;
    }

    return error;
}
