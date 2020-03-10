<template>
    <div>
        <!-- Loading -->
        <template v-if="location.loading">
            <v-skeleton-loader dense type="article" />
        </template>

        <!-- Data -->
        <template v-else-if="location.data">
            <v-row>
                <v-col class="section" cols="12" sm="8">
                    <div class="section__title">
                        Overview
                    </div>

                    <div
                        class="section__content"
                        v-html="location.data.description"
                    ></div>
                </v-col>

                <v-divider class="ml-10" vertical />

                <v-col
                    :class="
                        `section ${
                            $vuetify.breakpoint.smAndDown ? 'text-center' : ''
                        }`
                    "
                    cols="12"
                    sm="auto"
                >
                    <div class="section__title">
                        Extra information
                    </div>

                    <div class="section__content">
                        <span class="li__title">
                            Coordinates
                        </span>
                        <span class="li__content">
                            25° N, 23° E
                        </span>

                        <span class="li__title">
                            Created by
                        </span>
                        <span class="li__content">
                            <a>Barry Benson</a>
                        </span>

                        <span class="li__title">
                            Created on
                        </span>
                        <span class="li__content">
                            06/03/2020
                        </span>

                        <span class="li__title">
                            Last scan
                        </span>
                        <span class="li__content">
                            5 hours ago
                        </span>
                    </div>
                </v-col>
            </v-row>

            <div class="section">
                <div class="section__title">
                    <span>Location on map</span>

                    <v-spacer />

                    <v-btn color="primary" text>Open in maps</v-btn>
                </div>

                <div class="section__content">
                    <iframe
                        class="elevation-1"
                        style="width: 100%;"
                        height="400"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=3.711522817611695%2C51.02249491957064%2C3.713818788528443%2C51.02831859662666&amp;layer=mapnik&amp;marker=51.02540684955347%2C3.7126708030700684"
                    />
                </div>
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
import Query from "@/data/struct/Query";
import Location from "@/data/models/Location";
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
