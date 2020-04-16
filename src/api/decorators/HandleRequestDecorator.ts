import Vue from "vue";
import { EchoError, EchoPromise } from "echofetch";
import { CustomErrorOptions } from "@/api/error/types/CustomErrorOptions";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { createDecorator, VueDecorator } from "vue-class-component";
import { ComponentOptions } from "vue/types/umd";

export function HandleRequest<T>(
    request: EchoPromise<T>,
    errorOptions: CustomErrorOptions
): VueDecorator {
    return createDecorator(
        (options: ComponentOptions<Vue>, key: string): void => {
            // Handle the error when it occurs.
            request.getPromise().catch((error: EchoError) => {
                ErrorHandler.handle(error, errorOptions);
            });

            options.mixins?.push({
                data(this: Vue) {
                    return {
                        [key]: request,
                    };
                },
            });
        }
    );
}
