<template>
    <div>
        <v-row justify="center">
            <b class="pb-5 pt-2">{{ payload.location.name }}</b>

            <v-btn
                :to="`/location/${payload.location.secretId}`"
                color="primary"
                depressed
                small
            >
                View
                <v-icon right>
                    mdi-arrow-right
                </v-icon>
            </v-btn>
        </v-row>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { LocationPopupPayload } from "@/types/map/popup/locationpopup";

@Component
export default class LocationPopup extends Vue {
    /**
     * Payload passed by the MarkerMap.
     */
    @Prop()
    payload: LocationPopupPayload;
}
</script>
