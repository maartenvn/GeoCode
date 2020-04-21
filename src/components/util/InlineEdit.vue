<template>
    <div>
        <template v-if="editing">
            <v-row class="edit__input" no-gutters>
                <v-col :cols="isEditor ? '12' : 'auto'">
                    <!-- Editor -->
                    <editor
                        v-if="isEditor"
                        v-model="field.value"
                        class="mb-4"
                    />

                    <!-- Text Field -->
                    <v-text-field
                        v-else
                        class="d-inline-block"
                        v-model="field.value"
                        :rules="field.rules"
                        :error-messages="field.error"
                    />
                </v-col>

                <v-col
                    :cols="isEditor ? '12' : 'auto'"
                    class="d-flex justify-end align-center"
                >
                    <v-btn
                        class="edit__input__button"
                        color="error"
                        text
                        :icon="!isEditor"
                        @click="onEditCloseClick"
                    >
                        <span v-if="isEditor">Cancel</span>
                        <v-icon v-if="!isEditor">mdi-close</v-icon>
                    </v-btn>

                    <v-btn
                        class="edit__input__button"
                        color="success"
                        depressed
                        :icon="!isEditor"
                        :loading="loading"
                        :disabled="loading"
                        @click="onEditCheckClick"
                    >
                        <span v-if="isEditor">Confirm</span>
                        <v-icon v-if="!isEditor">mdi-check</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </template>

        <template v-else>
            <div class="edit__field">
                <!-- Slot -->
                <template v-if="!!this.$slots.default">
                    <slot />
                </template>

                <!-- Text -->
                <template v-else>
                    {{ field.value }}
                </template>

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
import Editor from "@/components/Editor.vue";

@Component({
    components: { Editor },
})
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
     * Is WYSIWYG editor
     */
    @Prop({ default: false })
    isEditor: boolean;

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

                // Emit the changes (for when v-model is used)
                this.$emit("input", this.field.value);
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
