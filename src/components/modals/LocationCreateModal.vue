<template>
    <div>
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>

            <v-toolbar-title>Create new location</v-toolbar-title>

            <v-spacer />

            <v-toolbar-items>
                <v-btn v-if="stepper === 1" dark text @click="stepper = 2">
                    Continue
                </v-btn>

                <v-btn
                    v-else-if="stepper === 2"
                    dark
                    text
                    @click="createLocation"
                >
                    Save
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card-title>
            Create a new location
        </v-card-title>

        <v-card-text>
            Follow the steps below to create a new location.
        </v-card-text>

        <v-stepper v-model="stepper" class="elevation-0">
            <v-stepper-header class="elevation-0">
                <v-stepper-step editable :complete="stepper > 1" :step="1">
                    Basic information
                </v-stepper-step>

                <v-divider />

                <v-stepper-step editable :complete="stepper > 2" :step="2">
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
                    <v-card-text>
                        Click on a location on the map to set the location. You
                        can also use the latitude or longitude values below.
                    </v-card-text>

                    <v-form class="pt-1 pl-3">
                        <set-location-map
                            :marker.sync="marker"
                            :zoom="1"
                            :searchEnabled="true"
                            height="400px"
                        />

                        <v-card-subtitle>Advanced control</v-card-subtitle>

                        <v-row>
                            <v-col cols="6">
                                <!-- Latitude -->
                                <v-text-field
                                    v-model="fields.latitude.value"
                                    :rules="fields.latitude.rules"
                                    :error-messages="fields.latitude.error"
                                    type="number"
                                    label="Latitude"
                                    placeholder="Latitude of the location"
                                    outlined
                                    required
                                />
                            </v-col>

                            <v-col cols="6">
                                <!-- Longitude -->
                                <v-text-field
                                    v-model="fields.longitude.value"
                                    :rules="fields.longitude.rules"
                                    :error-messages="fields.longitude.error"
                                    type="number"
                                    label="Longitude"
                                    placeholder="Longitude of the location"
                                    outlined
                                    required
                                />
                            </v-col>
                        </v-row>
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
import { Component, Vue, Watch } from "vue-property-decorator";
import { LatLng } from "leaflet";
import {
    InputFields,
    getFieldValues,
    setFieldErrors,
    InputField,
    modifyGeneralError
} from "@/util/fieldsutil";
import { MapMarker } from "@/types/mapmarker";
import LocatioHandler from "@/api/services/LocationService";
import Editor from "@/components/Editor.vue";
import SetLocationMap from "@/components/map/SetLocationMap.vue";

@Component({
    components: {
        Editor,
        SetLocationMap
    }
})
export default class LocationCreateModal extends Vue {
    /**
     * Stepper counter used for knowing in which stage of the configuration the user is.
     */
    stepper: number;

    /**
     * Input fields values & properties.
     */
    fields: InputFields;

    /**
     * Object containing the selected marker on the map.
     */
    marker: MapMarker;

    constructor() {
        super();

        this.stepper = 1;
        this.marker = new MapMarker(new LatLng(0, 0));
        this.fields = {
            name: new InputField(),
            description: new InputField(),
            listed: new InputField({ value: true }),
            latitude: new InputField(),
            longitude: new InputField()
        };
    }

    /**
     * Update the latitude & longitude fields when the selected marker on the map changes.
     */
    @Watch("marker", { deep: true })
    updateLocationFields(val: MapMarker) {
        this.fields.latitude.value = val.getLatLng().lat;
        this.fields.longitude.value = val.getLatLng().lng;
    }

    /**
     * Update the latitude of the "marker"-object when the field changes.
     */
    @Watch("fields.latitude.value")
    updateLat(val: number) {
        if (!isNaN(val)) {
            this.marker.setLatLng(new LatLng(val, this.marker.getLatLng().lng));
        }
    }

    /**
     * Update the longitude of the "marker"-object when the field changes.
     */
    @Watch("fields.longitude.value")
    updateLng(val: number) {
        if (!isNaN(val)) {
            this.marker.setLatLng(new LatLng(this.marker.getLatLng().lat, val));
        }
    }

    /**
     * Due to a bug in Leaflet, when a map is created and not visible (such in modals or steppers),
     * it will not render properly.
     *
     * By sending a fake resize event, we force Leaflet to refresh the map and display it properly.
     */
    @Watch("stepper")
    updateMap() {
        if (this.stepper == 2) {
            window.dispatchEvent(new Event("resize"));
        }
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
        LocatioHandler.create(getFieldValues(this.fields))
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
                // Handle field errors.
                setFieldErrors(this.fields, error);

                this.$error(modifyGeneralError(error), {
                    style: "SNACKBAR",
                    id: "locationCreate"
                });

                // Check if there is an error in the first step.
                // If this is the case, go to this step.
                if (this.fields.name.error || this.fields.description.error) {
                    this.stepper = 1;
                }
            });
    }
}
</script>
