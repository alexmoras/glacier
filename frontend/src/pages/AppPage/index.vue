<template>
    <div>
        <StaticNav />
        <b-container fluid>
            <b-card-title>
                App Page
            </b-card-title>
        </b-container>
    </div>
</template>

<script>
    import StaticNav from "../../components/layout/StaticNav";

    export default {
        name: "AppPage",
        components: {StaticNav}
    }
</script>

<style scoped>

</style>