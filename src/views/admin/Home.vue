<template>
    <v-container class="container--small">
        <p v-for="report in reports" :key="report.id">
            {{ report.location.name }}
        </p>
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

@Component({
    components: {
        AdminNavigation
    }
})
export default class Home extends Vue {
    reports = AdminService.getAll().then((data: string) => console.log(data));
    // console.log(reports);
}
</script>
