<template>
    <div class="entry-layout">
        <div class="entry-layout-container">
            <route-view></route-view>
        </div>
    </div>
</template>

<script>
    import RouteView from "./RouteView"
    export default {
        name: "EntryLayout",
        components: {RouteView},
    }
</script>

<style scoped>

</style>