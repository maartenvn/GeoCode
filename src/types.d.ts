import Vue from "vue";
import { ErrorValue, ErrorOptions } from "./util/error/error";

declare module "vue/types/vue" {
    interface Vue {
        $error(value: ErrorValue, options: ErrorOptions): void;
    }
}
