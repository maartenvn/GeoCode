<template>
    <v-row justify="center">
        <b class="pb-5 pt-2">{{ payload.location.name }}</b>

        <!-- Add to tour button -->
        <v-btn
            v-if="!payload.selected"
            color="primary"
            depressed
            small
            @click="onButtonClick"
        >
            Add to tour

            <v-icon right>
                mdi-plus-circle-outline
            </v-icon>
        </v-btn>

        <!-- Remove from tour button -->
        <v-btn v-else color="error" depressed small @click="onButtonClick">
            Remove

            <v-icon right>
                mdi-delete
            </v-icon>
        </v-btn>
    </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TourCreatePopupPayload } from "@/types/map/tour/TourCreatePopup";

@Component
export default class TourCreatePopup extends Vue {
    /**
     * Payload passed by the MarkerMap.
     */
    @Prop()
    payload: TourCreatePopupPayload;

    /**
     * Map object.
     */
    @Prop()
    map: any;

    /**
     * When the user clicks on the button.
     */
    onButtonClick() {
        // Close the popup.
        if (this.map) {
            this.map.closePopup();
        }

        // Execute the payload action.
        this.payload.action(this.payload.location);
    }
}
</script>
