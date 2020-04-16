export class ArrayUtil {
    /**
     * Delete a value from an array by value.
     * @param array
     * @param value
     */
    static delete<T>(array: Array<T>, value: T) {
        array.splice(array.indexOf(value), 1);
    }
}
