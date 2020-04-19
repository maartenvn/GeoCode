<template>
    <v-container class="container--small">
        <v-stepper v-model="stepper" vertical>
            <!-- Title -->
            <v-card-title>
                <span> Setup location: {{ location.name }} </span>

                <v-spacer />

                <v-btn to="/profile/locations" color="primary" depressed>
                    Setup later
                </v-btn>
            </v-card-title>

            <!-- Subtitle -->
            <v-card-subtitle>
                You have to setup the location before it is active.
            </v-card-subtitle>

            <!-- Step 1: Intro -->
            <setup-intro :stepper.sync="stepper" :stepper-position="1" />

            <!-- Step 2: Print -->
            <setup-print
                :secret-id="location.secretId"
                :stepper.sync="stepper"
                :stepper-position="2"
            />

            <!-- Step 3: Protect -->
            <setup-protect :stepper.sync="stepper" :stepper-position="3" />

            <!-- Step 4: Place -->
            <setup-rules
                :latitude="location.latitude"
                :longitude="location.longitude"
                :stepper.sync="stepper"
                :stepper-position="4"
            />

            <!-- Step 5: Activate -->
            <setup-activate
                :secret-id="location.secretId"
                :stepper.sync="stepper"
                :stepper-position="5"
            />
        </v-stepper>
    </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SetupPrint from "@/components/view/locations/setup/steps/SetupPrint.vue";
import SetupIntro from "@/components/view/locations/setup/steps/SetupIntro.vue";
import SetupRules from "@/components/view/locations/setup/steps/SetupPlace.vue";
import SetupProtect from "@/components/view/locations/setup/steps/SetupProtect.vue";
import SetupActivate from "@/components/view/locations/setup/steps/SetupActivate.vue";
import Location from "@/api/models/Location";

@Component({
    components: {
        SetupActivate,
        SetupProtect,
        SetupRules,
        SetupIntro,
        SetupPrint,
    },
})
export default class SetupLocationView extends Vue {
    /**
     * Location to setup.
     */
    @Prop()
    location: Location;
    /**
     * Used for keeping the current position of the stepper.
     */
    stepper = null;
}
</script>
