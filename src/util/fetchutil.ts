import axios, { Method } from "axios";
import Model from "@/data/struct/Model";
import Vue from "vue";
import Query from "@/data/struct/Query";
import ErrorMixin, { ErrorOptions } from "./error/errormixin";

export class FetchOptions {
    // URL/endpoint to fetch.
    public url: string;

    // Function to create a model to return when the data was fetched successfully
    public create: Function;

    // Type of the request (GET | POST | ...)
    public method?: Method;

    // Axios options.
    public options?: Record<string, any>;

    // Key inside the json that contains the data
    // Leave empty for no key.
    public jsonKey?: string;

    constructor() {
        this.url = "";
        this.create = () => null;
        this.method = "GET";
        this.options = {};
        this.jsonKey = "";
    }
}

/**
 * Fetch data from an external API.
 * @param options Fetch options
 */
export function fetchData<T extends Model | any>(
    options: FetchOptions
): Promise<T> {
    return new Promise((resolve, reject) => {
        axios({
            method: options.method,
            url: options.url,
            ...options.options
        })
            .then(response => {
                let data = response.data;
                let model;

                // If the JSON Key in the options has been set, extract the data at the given key
                if (options.jsonKey && options.jsonKey !== "") {
                    data = data[options.jsonKey];
                }

                // If the given data is an array, create an array of objects.
                // Otherwise create a single model.
                if (Array.isArray(data)) {
                    model = new Array<T>();

                    for (const value of data) {
                        const valueModel = options.create();
                        valueModel.parse(value);

                        model.push(valueModel);
                    }
                } else {
                    model = options.create();
                    model.parse(data);
                }

                resolve(model);
            })
            .catch(error => {
                // Convert the AxiosError to an ErrorValue.
                const errorValue = {
                    message: error.message,
                    code: error.response ? error.response.status : 0,
                    stacktrace: error
                };

                // Use some filtering to add some custom error codes.

                // NETWORK ERROR: code network_error
                if (error.response === undefined) {
                    errorValue.code = "network_error";
                }

                reject(errorValue);
            });
    });
}

/**
 * Fetch data from an external API and parse it inside a "Query" wrapper for easy use inside Vue components.
 * @param fetchData Result of calling the "fetchData" function.
 * @param errorOptions Error options.
 */
export function fetchQuery<T extends Model | any>(
    fetchData: Promise<T>,
    errorOptions: ErrorOptions
): Query<T> {
    // Create the initial query object.
    const query = new Query<T>();

    // Set the initial query state.
    Vue.set(query, "loading", true);

    fetchData
        .then(data => {
            // Update the data in the query.
            Vue.set(query, "data", data);
        })
        .catch(error => {
            // Update the error in the query.
            Vue.set(query, "error", error);

            // Set an delay between setting the error and sending it to the error bus.
            // This way we give Vue the time to render the ErrorHandler component.
            setTimeout(() => {
                // Spawn the error.
                new ErrorMixin().$error(error, errorOptions);
            }, 1);
        })
        .finally(() => {
            // Update the loading in the query.
            Vue.set(query, "loading", false);
        });

    return query;
}
