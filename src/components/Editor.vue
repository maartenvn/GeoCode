<template>
    <div class="editor">
        <div class="editor__title">{{ title }}</div>

        <v-textarea outlined v-model="content" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class BasicEditor extends Vue {
    /**
     * Title of the editor.
     */
    @Prop()
    title: string;

    /**
     * Value to display inside the editor.
     */
    @Prop()
    value: string;

    /**
     * Get the content that has been passed as prop.
     */
    get content(): string {
        return this.value;
    }

    /**
     * Emit changes of the prop to the parent.
     * This will prevent mutating the prop directly.
     */
    set content(value: string) {
        this.$emit("input", value);
    }
}
</script>

<style lang="scss">
.editor .v-card {
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.38);
}

.editor {
    position: relative;

    &__title {
        color: rgba(0, 0, 0, 0.6);
        font-size: 16px;
        line-height: 1;
        min-height: 8px;
        margin-bottom: 7px;
    }
}
</style>
