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
                    <span> <strong>Found location:</strong> Test </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content style="font-size: 0.9em;">
                    <ul>
                        <li><strong>Name:</strong> Test</li>
                        <li><strong>Coordinates:</strong> Test</li>
                        <li><strong>Creator:</strong> Test</li>
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
            <v-btn to="/" color="error" text>
                Cancel
            </v-btn>

            <v-spacer />

            <v-btn color="primary" depressed>
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

@Component
export default class VisitConfirm extends Vue {
    @Prop()
    location: Location;
}
</script>
