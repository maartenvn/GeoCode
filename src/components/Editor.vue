<template>
    <div>
        <div class="editor__title">{{ title }}</div>

        <div class="editor">
            <div ref="editor"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { exec, init } from "pell";
import "pell/dist/pell.css";

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
     * If the editor is disabled.
     */
    @Prop({ default: false })
    disabled: boolean;

    mounted() {
        const editor = this.$refs.editor as HTMLElement;

        // Initialize pell on an HTMLElement
        init({
            // <HTMLElement>, required
            element: editor,

            // <Function>, required
            // Use the output html, triggered by element's `oninput` event
            onChange: (html) => this.$emit("input", html),

            // <Array[string | Object]>, string if overwriting, object if customizing/creating
            // action.name<string> (only required if overwriting)
            // action.icon<string> (optional if overwriting, required if custom action)
            // action.title<string> (optional)
            // action.result<Function> (required)
            // Specify the actions you specifically want (in order)
            actions: [
                {
                    icon: "↶",
                    title: "Undo",
                    result: () => exec("undo"),
                },
                {
                    icon: "↷",
                    title: "redo",
                    result: () => exec("redo"),
                },
                "bold",
                "underline",
                "italic",
                "heading1",
                "heading2",
            ],

            // classes<Array[string]> (optional)
            // Choose your custom class names
            classes: {
                actionbar: "pell-actionbar editor__actionbar",
                button:
                    "pell-button editor__button v-btn v-btn--icon v-btn--round",
                content: "pell-content",
                selected: "v-btn--active",
            },
        });

        // Set the initial value of the editor.
        (editor as any).content.innerHTML = this.value;
    }

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
.editor {
    border: 1px solid rgba(0, 0, 0, 0.38);
    border-radius: 5px;

    &__actionbar {
        border-radius: 5px;
        padding: 5px;
        border: none;
        background-color: #f5f5f5 !important;
    }

    &__button {
        margin-right: 5px;
    }

    &__title {
        color: rgba(0, 0, 0, 0.6);
        font-size: 16px;
        line-height: 1;
        min-height: 8px;
        margin-bottom: 7px;
    }
}
</style>
