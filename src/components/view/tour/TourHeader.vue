<template>
    <div>
        <!-- Loading -->
        <template v-if="tour.isLoading()">
            <v-skeleton-loader dense type="article" />
        </template>

        <!-- Data -->
        <template v-else-if="tour.isSuccess()">
            <v-row justify="space-between" no-gutters>
                <v-col cols="auto">
                    <div class="tour__title">
                        <inline-edit
                            :value="tour.data.name"
                            :update="updateLocationName"
                            :enabled="isOwner"
                        />
                    </div>

                    <!-- Statistics -->
                    <div class="tour__info"></div>
                </v-col>

                <v-col cols="auto" align-self="center">
                    <v-btn
                        v-if="isOwner"
                        color="warning"
                        text
                        @click="() => void 0"
                    >
                        <v-icon left>
                            mdi-eye-off
                        </v-icon>

                        Deactivate
                    </v-btn>
                </v-col>
            </v-row>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { EchoPromise } from "echofetch";
import InlineEdit from "@/components/util/InlineEdit.vue";
import Tour from "@/api/models/Tour";
import User from "@/api/models/User";
import TourService from "@/api/services/TourService";

@Component({
    components: { InlineEdit },
})
export default class TourHeader extends Vue {
    /**
     * Tour.
     */
    @Prop()
    tour: EchoPromise<Tour>;

    /**
     * Creator of the tour
     */
    @Prop()
    creator: EchoPromise<User>;

    /**
     * If the current logged in user is the owner of the tour.
     */
    @Prop({ default: false })
    isOwner: boolean;

    /**
     * Update the tour name.
     * @param value Value of the tour name.
     */
    updateLocationName(value: string): EchoPromise<unknown> {
        return TourService.update(this.tour.requireData().secretId, {
            name: value,
        });
    }
}
</script>

<style lang="scss">
.tour {
    &__title {
        font-size: 2em;
    }
}
</style>
