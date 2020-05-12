<template>
    <v-container class="container--small">
        <div class="section">
            <div class="section__title">Licenses</div>

            <ul>
                <!-- Flat Icon -->
                <li>
                    Icons made by
                    <a
                        href="https://www.flaticon.com/authors/vitaly-gorbachev"
                        title="Vitaly Gorbachev"
                        target="_blank"
                    >
                        Vitaly Gorbachev
                    </a>
                    from
                    <a
                        href="https://www.flaticon.com/"
                        title="Flaticon"
                        target="_blank"
                    >
                        www.flaticon.com
                    </a>
                </li>

                <!-- Open Street Map -->
                <li>
                    Map data by
                    <a
                        href="https://www.openstreetmap.org/copyright"
                        target="_blank"
                    >
                        OpenStreetMap contributors
                    </a>
                </li>
            </ul>
        </div>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Licenses extends Vue {}
</script>
