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
            <location-ratings-card v-for="index in 3" :key="index" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import LocationRatingsCard from "@/components/view/location/ratings/LocationRatingsCard.vue";

@Component({
    components: { LocationRatingsCard }
})
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
