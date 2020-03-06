import Vue from "vue";
import { ErrorValue, ErrorOptions } from "./util/error/errormixin";

declare module "vue/types/vue" {
    interface Vue {
        $error(value: ErrorValue, options: ErrorOptions): void;
    }
}
