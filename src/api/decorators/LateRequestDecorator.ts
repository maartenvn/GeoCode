import Vue from "vue";
import { EchoError, EchoPromise } from "echofetch";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { createDecorator, VueDecorator } from "vue-class-component";
import { ComponentOptions } from "vue/types/umd";
import { RequestHandler } from "@/api/RequestHandler";

export function LateRequest<T>(
    origin: string,
    path: string,
    request: (value: any) => EchoPromise<T>,
    errorOptions: CustomErrorOptions
): VueDecorator {
    return createDecorator(
        (options: ComponentOptions<Vue>, key: string): void => {
            // If no watchers are present, create the section.
            if (typeof options.watch !== "object") {
                options.watch = Object.create(null);
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const watch: any = options.watch;

            if (
                typeof watch[origin] === "object" &&
                !Array.isArray(watch[origin])
            ) {
                watch[origin] = [watch[origin]];
            } else if (typeof watch[origin] === "undefined") {
                watch[origin] = [];
            }

            /**
             * Watch handler used for watching the given "origin".
             * When the "origin" succeeded, handle the request.
             * @param value
             */
            function watchHandler<T>(this: Vue, value: EchoPromise<T>) {
                if (value.isSuccess()) {
                    const pathValue = (value.requireData() as any)[path];

                    // Set the value of the given path.
                    (this as any)[key] = RequestHandler.handle(
                        request(pathValue),
                        errorOptions
                    );
                }
            }

            // Add the watcher to the watchers list
            watch[origin].push({
                handler: watchHandler,
                deep: true,
                immediate: false
            });

            // Add an initial "null"-value to the data list.
            options.mixins?.push({
                data(this: Vue) {
                    return {
                        [key]: null
                    };
                }
            });
        }
    );
}
