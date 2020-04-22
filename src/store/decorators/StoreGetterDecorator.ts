import Vue from "vue";
import { createDecorator, VueDecorator } from "vue-class-component";
import { ComponentOptions } from "vue/types/umd";

/**
 * Decorator for getting data from a store.
 */
export function StoreGetter(getterName: string): VueDecorator {
    return createDecorator(
        (options: ComponentOptions<Vue>, key: string): void => {
            if (options.computed === undefined) {
                options.computed = {};
            }

            options.computed[key] = function (this: Vue) {
                return this.$store.getters[getterName];
            };
        }
    );
}
