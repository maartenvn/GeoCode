<template>
    <div
        class="step"
        :id="id"
        :style="invert ? 'background-color: #f4f5f4' : ';'"
    >
        <v-responsive class="mx-auto" min-height="30vh" :max-width="1280">
            <v-row align="center" justify="center" style="height: 100%;">
                <v-col cols="12" sm="8" :order-sm="invert ? 2 : 1">
                    <!-- Title -->
                    <div class="step__title">
                        <slot name="title" />
                    </div>

                    <!-- Description -->
                    <div class="step__description">
                        <slot name="description" />
                    </div>
                </v-col>
                <v-col
                    cols="12"
                    sm="4"
                    :order-sm="invert ? 1 : 2"
                    class="step__image"
                >
                    <!-- Image -->
                    <v-img
                        class="step__image"
                        height="150"
                        width="150"
                        :src="image"
                        contain
                    />
                </v-col>
            </v-row>
        </v-responsive>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HomeTutorialStep extends Vue {
    @Prop()
    id: string;

    @Prop()
    image: string;

    @Prop({ default: false })
    invert: boolean;
}
</script>

<style lang="scss" scoped>
.step {
    min-height: 100px;
    padding: 30px 25px;
    text-align: center;

    &__title {
        font-size: 2em;
    }

    &__description {
        font-size: 1.2em;
        font-weight: 300;
    }

    &__image {
        display: flex !important;
        justify-content: center;
        align-items: center;
    }
}
</style>
