<template>
    <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { EchoError } from "echofetch";

@Component
export default class NotFound extends Vue {
    created() {
        const error: EchoError = {
            message: "",
            name: "",
            code: "404",
            config: {},
            isAxiosError: false,
            toJSON: () => new Object(),
        };

        // Throw an error with the "404" status code.
        // The error handler will automatically handle the error.
        ErrorHandler.handle(error, {
            id: "not_found",
            style: "SECTION",
            displayFullpage: true,
        });
    }
}
</script>
