<template>
    <div></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {
    created() {
        // Throw an error with the "404" status code.
        // The error handler will automatically handle the error.
        this.$error(
            {
                code: "404",
                message: ""
            },
            {
                id: "not_found",
                style: "SECTION",
                displayFullpage: true
            }
        );
    }
}
</script>
