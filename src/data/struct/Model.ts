export default interface Model {
    parse(json: unknown): void;
}

/**
 * Helper function to pass to create a new instance of a given model.
 * @param type Type of the model to create
 */
export function createModel<T extends Model>(type: new () => T): Function {
    return () => new type();
}
