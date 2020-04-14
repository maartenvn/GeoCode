<template>
    <div>
        <v-card-text>
            You can now add this location to your visited locations list. This
            gives you the possibility to write a message to the guestbook & read
            messages other users have left.
        </v-card-text>

        <v-expansion-panels tile flat>
            <v-expansion-panel>
                <v-expansion-panel-header>
                    <span>
                        <strong>Found location:</strong> {{ location.name }}
                    </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content style="font-size: 0.9em;">
                    <ul>
                        <li><strong>Name:</strong> {{ location.name }}</li>
                        <li>
                            <strong>Coordinates:</strong>
                            {{ latitudeDMS }},
                            {{ longitudeDMS }}
                        </li>
                        <li>
                            <strong>Address:</strong> {{ location.address }}
                        </li>
                        <li>
                            <strong>Country:</strong> {{ location.country }}
                        </li>
                    </ul>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-card-text>
            <p>
                Click the "continue"-button to add the location to your visited
                locations list.
            </p>
        </v-card-text>

        <v-card-actions>
            <v-btn to="/" color="error" text :disabled="loading">
                Cancel
            </v-btn>

            <v-spacer />

            <v-btn
                color="primary"
                depressed
                :disabled="loading"
                :loading="loading"
                @click="onConfirm"
            >
                Continue

                <v-icon right>
                    mdi-arrow-right
                </v-icon>
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ErrorHandler } from "@/api/error/ErrorHandler";
import { CoordinatesUtil } from "@/util/CoordinatesUtil";
import LocationService from "@/api/services/LocationService";
import Location from "@/api/models/Location";

@Component
export default class VisitConfirm extends Vue {
    /**
     * Visit Secret of the location.
     */
    @Prop()
    visitSecret: string;

    /**
     * Location to visit.
     */
    @Prop()
    location: Location;

    /**
     * If the confirm visit request is loading.
     */
    loading = false;

    /**
     * Get the latitude value in DMS.
     */
    get latitudeDMS(): string {
        return CoordinatesUtil.latToDMS(this.location.latitude);
    }

    /**
     * Get the longitude value in DMS.
     */
    get longitudeDMS(): string {
        return CoordinatesUtil.lngToDMS(this.location.longitude);
    }

    /**
     * Confirm the visit of the location.
     */
    onConfirm() {
        this.loading = true;

        LocationService.visitLocation(this.visitSecret)
            .then(data => {
                this.$store.dispatch("snackbar/open", {
                    message: "Successfully visited location",
                    color: "success"
                });
            })
            .catch(error => {
                ErrorHandler.handle(error, {
                    id: "confirmVisit",
                    style: "SNACKBAR"
                });
            })
            .finally(() => (this.loading = false));
    }
}
</script>
