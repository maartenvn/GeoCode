<template>
    <div>
        <!-- Error Component -->
        <error-placeholder :display-full-page="true" />

        <!-- Router view -->
        <router-view />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorPlaceholder from "@/components/error/ErrorPlaceholder.vue";

@Component({
    components: { ErrorPlaceholder }
})
export default class RouterViewWrapper extends Vue {}
</script>
