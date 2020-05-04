<template>
    <v-container class="container--small">
        Admin Page
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
export default class Home extends Vue {}
</script>
