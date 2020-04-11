import { InputFields } from "@/types/fields/InputFields";

export class InputFieldUtil {
    /**
     * Map the InputField-objects on an object with values.
     * @param fields Object containing all the different InputField-objects
     */
    static getValues(fields: InputFields): any {
        return Object.fromEntries(
            Object.entries(fields).map(([key, _]) => [key, fields[key].value])
        );
    }
}
