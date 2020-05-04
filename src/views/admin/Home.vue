<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-card class="stat elevation-12">
                <div class="stat__number">{{ stats.data.locationsCount }}</div>
                <div class="stat__title">locations</div>
            </v-card>
            <v-card class="stat elevation-12">
                <div class="stat__number">{{ stats.data.usersCount }}</div>
                <div class="stat__title">users</div>
            </v-card>
            <v-card class="stat elevation-12">
                <div class="stat__number">{{ stats.data.visitsCount }}</div>
                <div class="stat__title">visits</div>
            </v-card>
            <v-card class="stat elevation-12">
                <div class="stat__number">{{ stats.data.countriesCount }}</div>
                <div class="stat__title">countries</div>
            </v-card>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { StoreGetter } from "@/store/decorators/StoreGetterDecorator";
import AdminNavigation from "@/components/admin/AdminNavigation.vue";
import AdminService from "@/api/services/AdminService";
import { HandleRequest } from "@/api/decorators/HandleRequestDecorator";
import { EchoPromise } from "echofetch";
import { RequestHandler } from "@/api/RequestHandler";

@Component
export default class Home extends Vue {
    stats = RequestHandler.handle(AdminService.getStats(), {
        id: "adminStats",
        style: "SNACKBAR",
    });
}
</script>

<style lang="scss">
.stat {
    margin: 2rem;
    width: 15%;
    text-align: center;

    &__number {
        font-size: 8rem;
        font-weight: bold;
    }

    &__title {
        padding-bottom: 1rem;
        font-size: 2rem;
        text-transform: uppercase;
    }
}
</style>
