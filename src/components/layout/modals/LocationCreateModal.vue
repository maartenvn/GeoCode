<template>
    <div>
        <v-card-title>
            <span>Create a new location</span>

            <v-spacer />

            <v-btn icon @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>

        <v-card-text>
            Follow the steps below to create a new location.
        </v-card-text>

        <v-stepper v-model="stepper" class="elevation-0">
            <v-stepper-header class="elevation-0">
                <v-stepper-step editable :complete="stepper > 1" step="1">
                    Basic information
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step editable :complete="stepper > 2" step="2">
                    Location
                </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <!-- Step 1: Basic Information -->
                <v-stepper-content step="1">
                    <v-form class="pt-1 pl-3">
                        <!-- Name -->
                        <v-text-field
                            v-model="fields.name.value"
                            :rules="fields.name.rules"
                            :error-messages="fields.name.error"
                            label="Name"
                            placeholder="Name of the location"
                            outlined
                            required
                        />

                        <!-- Description -->
                        <editor
                            v-model="fields.description.value"
                            title="Description"
                        />

                        <!-- Listed -->
                        <div class="input__title">Listed</div>
                        <v-switch
                            v-model="fields.listed.value"
                            label="Should the location be visible on the locations overview page."
                        />
                    </v-form>

                    <v-card-actions>
                        <v-spacer />

                        <v-btn color="primary" depressed @click="stepper = 2">
                            Continue
                        </v-btn>

                        <v-btn color="error" text @click="close">Cancel</v-btn>
                    </v-card-actions>
                </v-stepper-content>

                <!-- Step 2: Location -->
                <v-stepper-content step="2">
                    <v-form class="pt-1 pl-3">
                        // TODO: Map here
                    </v-form>

                    <v-card-actions>
                        <v-spacer />

                        <v-btn
                            color="primary"
                            depressed
                            @click="createLocation"
                        >
                            Save
                        </v-btn>

                        <v-btn color="error" text @click="close">Cancel</v-btn>
                    </v-card-actions>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { createLocation } from "@/data/location";
import Editor from "@/components/Editor.vue";
import { Fields } from "../../../util/fieldsutil";

@Component({
    components: {
        Editor
    }
})
export default class LocationCreateModal extends Vue {
    stepper: number;
    fields: Fields;

    constructor() {
        super();

        this.stepper = 1;
        this.fields = {
            name: {
                value: "",
                rules: [],
                error: ""
            },

            description: {
                value: "",
                rules: [],
                error: ""
            },

            listed: {
                value: true,
                rules: [],
                error: ""
            }
        };
    }

    /**
     * Close the modal.
     */
    close() {
        this.$store.dispatch("modal/close");
    }

    /**
     * Create a new location with the given parameters.
     */
    createLocation() {
        createLocation({
            name: this.fields.name.value,
            description: this.fields.description.value,
            listed: this.fields.listed.value,
            lat: 51.026197,
            long: 3.709145
        })
            .then(response => {
                this.$store.dispatch("snackbar/open", {
                    message: "Location was succesfully created",
                    color: "success"
                });

                // Close the modal.
                this.$store.dispatch("modal/close");

                // Go to the route of the created location.
                this.$router.push(`/location/${response.value}`);
            })
            .catch(error => {
                this.$error(error, {
                    style: "SNACKBAR",
                    id: "location_create"
                });
            });
    }
}
</script>
