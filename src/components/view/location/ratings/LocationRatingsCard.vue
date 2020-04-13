<template>
    <v-card class="mb-3">
        <v-card-text>
            <v-row>
                <v-col cols="auto">
                    <v-avatar>
                        <img
                            src="https://assets.change.org/photos/6/yu/xm/phYUXmIiZEuPcns-800x450-noPad.jpg?1490797613"
                            alt="John"
                        />
                    </v-avatar>
                </v-col>

                <v-col>
                    <v-row class="pb-2" no-gutters>
                        <div class="rating__username">
                            Barry Benson
                        </div>

                        <v-spacer />

                        <v-rating :value="3" dense small readonly />
                    </v-row>

                    <v-row class="rating__comment" no-gutters>
                        (Barry is picking out a shirt) Yellow, black. Yellow,
                        black. Yellow, black. Yellow, black. Ooh, black and
                        yellow! Let's shake it up a little.
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Rating from "@/api/models/Rating";

@Component
export default class LocationRatingsCard extends Vue {
    /**
     * If in loading state.
     */
    @Prop({ default: false })
    loading: boolean;

    /**
     * Rating for the card to display
     */
    @Prop()
    rating: Rating;
}
</script>

<style lang="scss">
.rating {
    &__username {
        font-size: 1.1em;
        font-weight: bold;
    }
}
</style>
