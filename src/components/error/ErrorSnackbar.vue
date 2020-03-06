<template>
    <div></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ErrorValue, ErrorOptions } from "../../util/error/errormixin";
import { ErrorPayload } from "../../util/error/errorhandler";

@Component
export default class ErrorCard extends Vue {
    /**
     * Payload of the error.
     */
    @Prop()
    payload: ErrorPayload;

    /**
     * Spawn a snackbar when the component is created.
     */
    created() {
        this.$store.dispatch("snackbar/open", {
            message: this.payload.value.message,
            color: "error"
        });
    }
}
</script>
