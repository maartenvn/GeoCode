<template>
    <v-container class="container--small">
        <!-- Loading -->
        <template v-if="privacyAgreement.isLoading()">
            <v-skeleton-loader type="heading" height="50px" />

            <v-skeleton-loader
                v-for="index in 6"
                :key="index"
                type="paragraph"
                height="75px"
            />
        </template>

        <!-- Data -->
        <template v-else-if="privacyAgreement.isSuccess()">
            <div v-html="privacyAgreement.requireData()" />
        </template>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PrivacyService from "@/api/services/PrivacyService";
import { RequestHandler } from "@/api/RequestHandler";

@Component
export default class PrivacyPolicy extends Vue {
    privacyAgreement = RequestHandler.handle(
        PrivacyService.getPrivacyAgreement(),
        {
            id: "privacyAgreement",
            style: "SECTION",
            displayFullpage: true,
        }
    );
}
</script>
