<template>
    <div class="section">
        <div class="section__title">
            Ratings

            <v-spacer />

            <v-btn color="primary" text>
                Leave a review
                <v-icon right>mdi-plus-circle-outline</v-icon>
            </v-btn>
        </div>

        <div class="section__content">
            <v-card class="mb-3" v-for="index in 3" :key="index">
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
                                (Barry is picking out a shirt) Yellow, black.
                                Yellow, black. Yellow, black. Yellow, black.
                                Ooh, black and yellow! Let's shake it up a
                                little.
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class LocationRatings extends Vue {
    @Prop()
    secretId: string;
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
