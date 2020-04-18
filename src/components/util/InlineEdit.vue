<template>
    <div>
        <template v-if="editing">
            <div class="edit__input">
                <v-text-field
                    class="d-inline-block"
                    v-model="field.value"
                    :rules="field.rules"
                    :error-messages="field.error"
                />

                <v-btn
                    class="edit__input__button"
                    color="success"
                    depressed
                    icon
                    :loading="loading"
                    :disabled="loading"
                    @click="onEditCheckClick"
                >
                    <v-icon>mdi-check</v-icon>
                </v-btn>

                <v-btn
                    class="edit__input__button"
                    color="error"
                    depressed
                    icon
                    @click="onEditCloseClick"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
        </template>

        <template v-else>
            <div class="edit__field">
                {{ field.value }}

                <v-btn
                    v-if="enabled"
                    class="edit__field__button"
                    icon
                    @click="onEditClick"
                >
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InputField } from "@/types/fields/InputField";
import { EchoPromise } from "echofetch";
import { ErrorHandler } from "@/api/error/ErrorHandler";

@Component
export default class InlineEdit extends Vue {
    /**
     * Value to display.
     */
    @Prop()
    value: unknown;

    /**
     * Update function.
     */
    @Prop()
    update: (value: unknown) => EchoPromise<unknown>;

    /**
     * Rules for the input field.
     */
    @Prop({ default: () => [] })
    rules: Array<Function>;

    /**
     * If editing is enabled.
     */
    @Prop({ default: true })
    enabled: boolean;

    /**
     * Copy of value to prevent mutating prop directly.
     */
    valueCopy = this.value;

    /**
     * If the field is being edited or not.
     */
    editing = false;

    /**
     * If the update is loading or not.
     */
    loading = false;

    /**
     * Input field
     */
    field = new InputField({ value: this.valueCopy, rules: this.rules });

    /**
     * Called when the "edit"-button is clicked.
     */
    onEditClick() {
        this.editing = true;
    }

    /**
     * Close the edit menu when the "edit-close" button is clicked.
     */
    onEditCloseClick() {
        this.field.value = this.valueCopy;
        this.editing = false;
    }

    /**
     * Execute the edit update action
     */
    onEditCheckClick() {
        this.loading = true;

        this.update(this.field.value)
            .then(() => {
                this.$store.dispatch("snackbar/open", {
                    message: "Successfully updated",
                    color: "success",
                });

                this.editing = false;
                this.valueCopy = this.field.value;
                this.loading = false;
            })
            .catch((error) => {
                this.loading = false;

                ErrorHandler.handle(error, {
                    id: "inlineEditUpdate",
                    style: "SNACKBAR",
                });
            });
    }
}
</script>

<style lang="scss">
.edit {
    &__field {
        display: flex;
        align-items: center;

        &__button {
            margin-left: 15px;
        }
    }

    &__input {
        &__button {
            margin-left: 15px;
        }
    }
}
</style>
