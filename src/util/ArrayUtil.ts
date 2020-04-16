export class ArrayUtil {
    /**
     * Delete a value from an array by value.
     * @param array
     * @param value
     */
    static delete<T>(array: Array<T>, value: T) {
        array.splice(array.indexOf(value), 1);
    }

    /**
     * Update a value inside an array by its old value.
     * @param array
     * @param oldValue
     * @param newValue
     */
    static update<T>(array: Array<T>, oldValue: T, newValue: T) {
        array[array.indexOf(oldValue)] = newValue;
    }
}
