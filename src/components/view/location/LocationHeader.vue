<template>
    <div>
        <!-- Loading -->
        <template v-if="location.isLoading()">
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
            <error-placeholder error-id="location" />
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import Location from "@/api/models/Location";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: {
        ErrorPlaceholder
    }
})
export default class LocationHeader extends Vue {
    @Prop()
    location: EchoPromise<Location>;
}
</script>

<style lang="scss">
.location {
    &__title {
        font-size: 2em;
    }
}
</style>
