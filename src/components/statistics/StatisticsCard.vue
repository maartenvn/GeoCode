<template>
    <v-card class="statistics__card" :color="color" :flat="flat" dark>
        <!-- Loading -->
        <template v-if="loading">
            <div class="statistics__card__stat">
                <v-skeleton-loader width="100" height="50" type="text" dense />
            </div>

            <div class="statistics__card__title">
                <v-skeleton-loader width="200" type="text" dense />
            </div>
        </template>

        <!-- Data -->
        <template v-else>
            <div class="statistics__card__stat">
                {{ value }}
            </div>

            <div class="statistics__card__title">
                {{ title }}
            </div>
        </template>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class StatisticsCard extends Vue {
    /**
     * Loading.
     */
    @Prop({ default: false })
    loading: boolean;

    /**
     * Statistic value.
     */
    @Prop()
    value: number;

    /**
     * Statistic title.
     */
    @Prop()
    title: string;

    /**
     * Color of the card.
     */
    @Prop({ default: "primary" })
    color: string;

    /**
     * If the card is flat or not.
     */
    @Prop({ default: false })
    flat: boolean;
}
</script>

<style lang="scss">
.statistics {
    &__card {
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__stat {
            font-weight: 600;
            font-size: 3.5rem;
        }

        &__title {
            font-size: 1.3rem;
        }
    }
}
</style>
