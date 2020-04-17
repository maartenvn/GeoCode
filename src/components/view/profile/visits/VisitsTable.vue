<template>
    <div>
        <!-- Loading -->
        <template v-if="visits.isLoading()">
            <v-skeleton-loader type="table" dense />
        </template>

        <!-- Data -->
        <template v-else-if="visits.isSuccess()">
            <v-data-table
                :headers="tableHeaders"
                :search="tableSearch"
                :items="tableItems"
            >
                <template v-slot:top>
                    <v-text-field
                        v-model="tableSearch"
                        prepend-icon="mdi-database-marker"
                        label="Search for a location"
                        single-line
                        outlined
                        dense
                    />
                </template>

                <template v-slot:item.action="{ item }">
                    <!-- View -->
                    <v-btn
                        :to="`/locations/${item.secretId}`"
                        color="primary"
                        text
                    >
                        View
                        <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>
                </template>

                <template v-slot:no-data>
                    You have not visited any locations yet.
                </template>

                <template v-slot:no-results>
                    No locations found with the given parameters
                </template>
            </v-data-table>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import StatisticsCard from "@/components/statistics/StatisticsCard.vue";
import LocationsTable from "@/components/view/locations/LocationsTable.vue";
import Visit from "@/api/models/Visit";
import Location from "@/api/models/Location";

@Component({
    components: { LocationsTable, StatisticsCard },
})
export default class ProfileVisits extends Vue {
    /**
     * List of visits.
     */
    @Prop()
    visits: EchoPromise<Array<Visit>>;

    /**
     * Table headers
     */
    tableHeaders = [
        {
            text: "Location",
            value: "location.name",
        },
        {
            text: "Country",
            value: "location.country",
        },
        {
            text: "Amount of visits",
            value: "amount",
        },
        {
            text: "",
            value: "action",
            sortable: false,
            align: "end",
        },
    ];

    /**
     * Table search value.
     */
    tableSearch = "";

    /**
     * Get the items for the table.
     */
    get tableItems(): Array<{ location: Location; amount: number }> {
        if (this.visits.isSuccess()) {
            const visitsByLocation: any = this.visits
                .requireData()
                .reduce((accumulator: any, value: Visit): any => {
                    const locationArray = accumulator[value.location.secretId];

                    accumulator[value.location.secretId] = locationArray || [];
                    accumulator[value.location.secretId].push(value);

                    return accumulator;
                }, {});

            return Object.keys(visitsByLocation).map((secretId: any) => {
                return {
                    location: visitsByLocation[secretId][0].location,
                    amount: visitsByLocation[secretId].length,
                };
            });
        } else {
            return [];
        }
    }
}
</script>
