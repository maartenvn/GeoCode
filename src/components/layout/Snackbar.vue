<template>
    <v-snackbar
        v-model="open"
        :bottom="data.y === 'bottom'"
        :left="data.x === 'left'"
        :multi-line="data.mode === 'multi-line'"
        :right="data.x === 'right'"
        :timeout="data.timeout"
        :top="data.y === 'top'"
        :vertical="data.mode === 'vertical'"
        :color="data.color"
    >
        {{ data.message }}

        <v-spacer />

        <v-btn text @click="close">
            close
        </v-btn>
    </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapState } from "vuex";

@Component({
    computed: {
        ...mapState("snackbar", ["data"])
    },

    methods: {
        ...mapActions("snackbar", ["close"])
    }
})
export default class Snackbar extends Vue {
    /**
     * Get if the snackbar should be open.
     */
    get open(): boolean {
        return this.$store.state.snackbar.open;
    }

    /**
     * Set if the snackbar should be open/closed.
     */
    set open(value: boolean) {
        this.$store.commit("snackbar/SET_OPEN", value);
    }
}
</script>
