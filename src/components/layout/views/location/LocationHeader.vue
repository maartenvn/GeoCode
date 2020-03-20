<template>
    <div>
        <!-- Loading -->
        <template v-if="location.loading">
            <v-skeleton-loader dense type="article" />
        </template>

        <!-- Data -->
        <template v-else-if="location.data">
            <div class="location__title">
                {{ location.data.name }}
            </div>

            <div class="location__info">
                <v-row>
                    <v-col cols="auto" class="d-flex">
                        <v-rating
                            class="pr-2"
                            :value="3"
                            dense
                            small
                            readonly
                        />
                        15 reviews
                    </v-col>

                    <v-divider class="divider--vertical" vertical />

                    <v-col cols="auto" class="d-flex">
                        <v-icon left>mdi-qrcode-scan</v-icon>
                        171 scans
                    </v-col>
                </v-row>
            </div>
        </template>

        <!-- Error -->
        <template v-else>
            <error-handler errorId="location" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Query from "@/api/struct/Query";
import Location from "@/api/models/Location";
import ErrorHandler from "@/components/error/ErrorHandler.vue";

@Component({
    components: {
        ErrorHandler
    }
})
export default class LocationHeader extends Vue {
    @Prop()
    location: Query<Location>;
}
</script>

<style lang="scss">
.location {
    &__title {
        font-size: 2em;
    }
}
</style>
