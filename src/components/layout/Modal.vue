<template>
    <v-dialog
        v-model="open"
        persistent
        :max-width="modalData.width"
        :fullscreen="modalData.fullscreen"
        :transition="
            modalData.fullscreen
                ? 'dialog-bottom-transition'
                : 'dialog-transition'
        "
    >
        <!-- Other -->
        <v-card>
            <!-- Component -->
            <component
                v-if="modalData.component"
                :is="component"
                :action="modalData.action"
                :payload="modalData.componentPayload"
            />
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";
import { ModalData } from "@/store/modules/modal";
import LoadingModal from "../modal/LoadingModal.vue";

@Component({
    computed: {
        ...mapState("modal", ["data"])
    },

    methods: {
        ...mapActions("modal", ["close"])
    }
})
export default class Modal extends Vue {
    /**
     * Get the data for the modal.
     */
    get modalData(): ModalData {
        // Create a clone of the object to prevent Vue from mutating the data from store directly.
        return Object.assign({}, this.$store.state.modal.data);
    }

    /**
     * Set the data for the modal.
     */
    set modalData(value: ModalData) {
        this.$store.commit("modal/SET_DATA", value);
    }

    /**
     * Get if the snackbar should be open.
     */
    get open(): boolean {
        return this.$store.state.modal.open;
    }

    /**
     * Set if the snackbar should be open/closed.
     */
    set open(value: boolean) {
        this.$store.commit("modal/SET_OPEN", value);
    }

    /**
     * Get the component.
     */
    get component(): unknown | Function {
        if (this.$store.state.modal.data.component instanceof Promise) {
            return () => ({
                component: this.$store.state.modal.data.component(),
                loading: LoadingModal
            });
        } else {
            return this.$store.state.modal.data.component;
        }
    }
}
</script>
