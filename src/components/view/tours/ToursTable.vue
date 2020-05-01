<template>
    <div>
        <!-- Loading -->
        <template v-if="tours.isLoading()">
            <v-skeleton-loader dense type="table" />
        </template>

        <!-- Data -->
        <template v-else-if="tours.isSuccess()">
            <v-data-table
                :headers="tableHeaders"
                :search="tableSearch"
                :items="tours.data"
            >
                <template v-slot:top>
                    <v-text-field
                        v-model="tableSearch"
                        prepend-icon="mdi-database-marker"
                        label="Search for a country or address"
                        single-line
                        outlined
                        dense
                    />
                </template>

                <template v-slot:no-data>
                    No tours available
                </template>

                <template v-slot:no-results>
                    No tours found with the given parameters
                </template>

                <template v-slot:item.active="{ item }">
                    <template v-if="activeEnabled">
                        <template v-if="!item.active">
                            <v-chip color="warning" text-color="white" small>
                                Not activated
                            </v-chip>
                        </template>

                        <template v-else>
                            <v-chip color="success" text-color="white" small>
                                Activated
                            </v-chip>
                        </template>
                    </template>
                </template>

                <template v-slot:item.action="{ item }">
                    <!-- Delete -->
                    <v-btn
                        v-if="deleteEnabled"
                        color="error"
                        text
                        @click="openConfirmDelete(item)"
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>

                    <!-- View -->
                    <v-btn
                        v-if="item.active || !activeEnabled"
                        :to="`/tours/${item.secretId}`"
                        color="primary"
                        text
                    >
                        View
                        <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>

                    <v-btn
                        v-else
                        :to="`/tours/${item.secretId}`"
                        color="warning"
                        text
                    >
                        Activate
                        <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import Tour from "@/api/models/Tour";

@Component
export default class ToursTable extends Vue {
    /**
     * List with tours.
     */
    @Prop()
    tours: EchoPromise<Array<Tour>>;

    /**
     * Should a delete button be showed.
     */
    @Prop({ default: false })
    deleteEnabled: boolean;

    /**
     * Should the "active"-column be showed.
     */
    @Prop({ default: false })
    activeEnabled: boolean;

    /**
     * List with headers for the Vuetify data table.
     */
    tableHeaders = [
        {
            text: "Name",
            value: "name",
        },
        {
            text: "Country",
            value: "country",
        },
        {
            text: "",
            value: "active",
        },
        {
            text: "",
            value: "action",
            sortable: false,
            align: "end",
        },
    ];

    /**
     * Value of the search field.
     */
    tableSearch = "";
}
</script>
