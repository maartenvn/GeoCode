import { createDecorator, VueDecorator } from "vue-class-component";
import { ComponentOptions } from "vue/types/umd";
import Vue from "vue";

export function Event(): VueDecorator {
    return createDecorator(
        (options: ComponentOptions<Vue>, key: string): void => {
            if (options.methods === undefined) {
                options.methods = {};
            }

            if (options.methods) {
                options.methods[key] = function (this: Vue) {
                    this.$emit(key);
                };
            }
        }
    );
}
