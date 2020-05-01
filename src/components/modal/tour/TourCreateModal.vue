<template>
    <div>
        <!-- Toolbar -->
        <v-toolbar dark color="primary">
            <v-btn icon dark @click="close">
                <v-icon>mdi-close</v-icon>
            </v-btn>

            <v-toolbar-title>Create new tour</v-toolbar-title>

            <v-spacer />

            <v-toolbar-items>
                <v-btn v-if="stepper === 1" dark text @click="stepper = 2">
                    Continue
                </v-btn>

                <v-btn
                    v-else-if="stepper === 2"
                    dark
                    text
                    @click="create"
                    :disabled="loading"
                    :loading="loading"
                >
                    Save
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-card-title>
            Create a new tour
        </v-card-title>

        <v-card-text>
            Follow the steps below to create a new tour.
        </v-card-text>

        <!-- Stepper -->
        <v-stepper v-model="stepper" class="elevation-0">
            <!-- Header -->
            <v-stepper-header class="elevation-0">
                <v-stepper-step editable :complete="stepper > 1" :step="1">
                    Information
                </v-stepper-step>

                <v-divider />

                <v-stepper-step editable :complete="stepper > 2" :step="2">
                    Locations
                </v-stepper-step>
            </v-stepper-header>

            <!-- Steps -->
            <v-stepper-items>
                <!-- Step 1: Information -->
                <v-stepper-content step="1">
                    <v-form class="pt-1 pl-3">
                        <!-- Name -->
                        <v-text-field
                            v-model="fields.name.value"
                            :rules="fields.name.rules"
                            :error-messages="fields.name.error"
                            label="Name"
                            placeholder="Name of the tour"
                            :disabled="loading"
                            outlined
                            required
                        />

                        <!-- Description -->
                        <editor
                            v-model="fields.description.value"
                            :disabled="loading"
                            title="Description"
                        />

                        <!-- Listed -->
                        <div class="input__title">Listed</div>
                        <v-switch
                            v-model="fields.listed.value"
                            label="Should the tour be visible on the tours overview page."
                            :disabled="loading"
                        />
                    </v-form>
                </v-stepper-content>

                <!-- Step 2: Locations -->
                <v-stepper-content step="2">
                    <v-form class="pt-1 pl-3">
                        <tour-map
                            height="400px"
                            width="100%"
                            :zoom="2"
                            :searchEnabled="true"
                            :tour-locations.sync="fields.locations.value"
                            :show-select="true"
                            :show-locations="true"
                        />

                        <!-- Show the tour locations -->
                        <div class="mt-5">
                            <div class="text--secondary pb-4">
                                Selected locations
                            </div>

                            <v-combobox
                                v-model="fields.locations.value"
                                chips
                                clearable
                                hide-no-data
                                label="Selected locations"
                                append-icon=""
                                multiple
                                solo
                                outlined
                                flat
                            >
                                <template
                                    v-slot:selection="{
                                        attrs,
                                        item,
                                    }"
                                >
                                    <v-chip
                                        v-bind="attrs"
                                        close
                                        @click:close="removeLocation(item)"
                                    >
                                        <strong>
                                            {{ getLocationPosition(item) + 1 }}.
                                            {{ item.name }}
                                        </strong>
                                    </v-chip>
                                </template>
                            </v-combobox>
                        </div>
                    </v-form>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { InputField } from "@/types/fields/InputField";
import Editor from "@/components/Editor.vue";
import TourMap from "@/components/map/tour/TourMap.vue";
import Location from "@/api/models/Location";
import { ArrayUtil } from "@/util/ArrayUtil";
import LocationService from "@/api/services/LocationService";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import TourService from "@/api/services/TourService";
import { InputFieldUtil } from "@/util/InputFieldUtil";

@Component({ components: { TourMap, Editor } })
export default class TourCreateModal extends Vue {
    /**
     * If the modal is loading.
     */
    loading = false;

    /**
     * Stepper counter used for knowing in which stage of the configuration the user is.
     */
    stepper = 1;

    /**
     * Input fields values & properties.
     */
    fields = {
        name: new InputField(),
        description: new InputField(),
        listed: new InputField({ value: true }),
        locations: new InputField<Array<Location>>({ value: [] }),
    };

    /**
     * Due to a bug in Leaflet, when a map is created and not visible (such in modal or steppers),
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
     * Create the tour
     */
    create() {
        const locationIds = this.fields.locations.value.map(
            (location: Location) => location.secretId
        );
        const body = {
            ...InputFieldUtil.getValues(this.fields),
            locations: locationIds,
        };

        TourService.create(body)
            .then((response) => {
                this.$store.dispatch("snackbar/open", {
                    message: "Tour was successfully created",
                    color: "success",
                });

                // Close the modal.
                this.$store.dispatch("modal/close");

                // Go to the route of the created tour.
                this.$router.push(`/tours/${response.secretId}`);
            })
            .catch((error) => {
                // Handle field errors.
                ErrorHandler.handle(
                    error,
                    {
                        style: "SNACKBAR",
                        id: "tourCreate",
                    },
                    this.fields
                );

                // Check if there is an error in the first step.
                // If this is the case, go to this step.
                if (this.fields.name.error || this.fields.description.error) {
                    this.stepper = 1;
                }
            })
            .finally(() => (this.loading = false));
    }

    /**
     * Get the position of the given location in the selected locations list.
     * @param location
     */
    getLocationPosition(location: Location): number {
        return (this.fields.locations.value as Array<Location>).indexOf(
            location
        );
    }

    /**
     * Remove a location from the selected locations list.
     * @param location
     */
    removeLocation(location: Location) {
        ArrayUtil.delete(
            this.fields.locations.value as Array<Location>,
            location
        );
    }
}
</script>
