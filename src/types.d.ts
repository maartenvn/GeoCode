import Vue from "vue";
import QueryError from "./api/struct/QueryError";
import QueryErrorOptions from "./api/struct/QueryErrorOptions";

declare module "vue/types/vue" {
    interface Vue {
        $error(value: QueryError, options: QueryErrorOptions): void;
    }
}
